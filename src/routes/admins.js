/**
 * Module dependencies
 */

import { Auth, Database } from "../controllers.js";
import { Debug, departments, exams } from "../utilities.js";

import { Admin } from "../models.js";
import { Router } from "express";
// import { decode } from '../controllers/auth'

const router = Router();
const db = new Database(Admin);

const { sign, admin, master } = Auth;

/**
 * Login
 */

router.post("/login", (req, res) => {
  db.findOne({ username: req.body.username }, (error, admin) => {
    if (error) return res.status(error.code).json(error.message);

    // check if username exists
    if (!admin) {
      const message = "Username does not exist";
      Debug.auth(["Login", message]);
      return res.status(404).json({ code: 404, message });
    }

    // check if user is disabled
    if (admin.disabled) {
      const message = "Account is disabled";
      Debug.auth(["Login", message]);
      return res.status(404).json({ code: 404, message });
    }

    // check if password matches
    admin.comparePassword(req.body.password, (error, valid) => {
      if (error) return res.status(500).json(error);

      if (!valid) {
        const message = "Password is incorrect";
        Debug.auth(["Login", message]);
        return res.status(404).json({ code: 404, message });
      }

      const token = sign({ _id: admin._id, admin: admin.role });
      const user = {
        username: admin.username,
        role: admin.role,
        token,
        permissions: admin.permissions,
        examPermissions: admin.examPermissions,
        departmentPermissions: admin.departmentPermissions,
      };
      Debug.auth(["Login", `[Admin Role] ${admin.role}`]);
      res.json({ token, user, departments, exams });
    });
  });
});

/**
 * Get all admins
 */

router.get("/all", master, (req, res) => {
  if(req.query.exam==undefined){
    db.find(
      { _id: { $ne: req.user._id }},
      (error, admins) => {
        if (error) return res.status(error.code).json(error.message);
        res.json(admins);
      },
      { fields: "username role permissions disabled examPermissions departmentPermissions" }
    );
  }else{
    db.find(
      { _id: { $ne: req.user._id },examPermissions:req.query.exam },
      (error, admins) => {
        if (error) return res.status(error.code).json(error.message);
        res.json(admins);
      },
      { fields: "username role permissions disabled examPermissions departmentPermissions" }
    );
  }
 
});

/**
 * Create new admin
 */

router.post("/new", master, (req, res) => {
  db.create(req.body, (error, admin) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(admin);
  });
});

/**
 * Update admin
 */

router.put("/update", master, (req, res) => {
  db.updateById(req.query.id, req.body, (error, admin) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(admin);
  });
});

/**
 * Change admin password
 */

router.put("/password", admin, (req, res) => {
  db.updateById(req.user._id, req.body, (error, admin) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(admin);
  });
});

export default router;
