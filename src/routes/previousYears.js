/**
 * Module dependencies
 */

import { Router } from "express";
import { Database } from "../controllers.js";
import { PreviousYears } from "../models.js";

const router = Router();
const db = new Database(PreviousYears);

/**
 * Get test previousYears by id
 */

router.get("/", (req, res) => {
  db.findById(req.query.id, (error, previousYears) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});

/**
 * Get all previousYears test
 */

router.get("/all", (req, res) => {
  db.find(req.query, (error, previousYears) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});

/**
 * Create a previousYears tests
 */

router.post("/new", (req, res) => {
  // res.json(req.body);
  const params = req.body;
    params.postedBy = params.user.username;
  db.create(params, (error, previousYears) => {
    
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});

/**
 * Update a previousYears test
 */

router.put("/update", (req, res) => {
  const params = req.body;
  params.updatedBy = params.user.username;
  db.updateById(req.query.id, params, (error, previousYears) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});
/**
 * publish a previousYears test
 */
router.put("/publish", (req, res) => {
  const params = req.body;
  
  db.updateById(req.query.id, params, (error, previousYears) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});
/**
 * lock a previousYears test
 */
router.put("/lock", (req, res) => {
  const params = req.body;
  
  db.updateById(req.query.id, params, (error, previousYears) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});

/**
 * Delete a previousYears test
 */

router.delete("/delete", (req, res) => {
  db.deleteById(req.query.id, (error, previousYears) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(previousYears);
  });
});

export default router;
