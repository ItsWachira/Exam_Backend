/**
 * Module dependencies
 */

import { Router } from "express";
import { Database } from "../controllers.js";
import { Notification } from "../models.js";

const router = Router();
const db = new Database(Notification);

/**
 * Get specific notification
 */

router.get("/", (req, res) => {
  db.findById(req.query.id, (error, notification) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(notification);
  });
});

/**
 * Get all notifications
 */

router.get("/all", (req, res) => {
  const { limit, ...params } = req.query;

  db.find(
    { ...params },
    (error, notifications) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(notifications);
    },
    { limit }
  );
});

/**
 * Create notifications
 */

router.post("/create", (req, res) => {
  db.create(req.body, (error, notification) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(notification);
  });
});

export default router;
