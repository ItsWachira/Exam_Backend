/**
 * Module dependencies
 */

import { Router } from "express";
import { Auth, Database } from "../controllers.js";
import { Answer, Forum } from "../models.js";

const router = Router();
const db = new Database(Forum);
const dbAnswer = new Database(Answer);

const { student } = Auth;

/**
 * Get all forum posts
 */

router.get("/all", student, (req, res) => {
  const options = { sort: "-createdAt" };

  db.find(
    { postedBy: { $ne: req.user._id }, department: req.query.department },
    (error, forums) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(forums);
    },
    options
  );
});

/**
 * Get specific forum post
 */

router.get("/post/:id", student, (req, res) => {
  db.findById(req.params.id, (error, post) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(post);
  });
});

/**
 * create a new post
 */

router.post("/new", student, (req, res) => {
  const params = req.body;
  params.postedBy = req.user._id;

  db.create(params, (error, forum) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(forum);
  });
});

/**
 * get posts for signed in student
 */

router.get("/posts", student, (req, res) => {
  const options = { sort: "-createdAt" };

  db.find(
    { postedBy: req.user._id },
    (error, posts) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(posts);
    },
    options
  );
});

/**
 * create a new comment to a post
 */

router.post("/comment", student, (req, res) => {
  const params = req.body;
  params.postedBy = req.user._id;

  dbAnswer.create(params, (error, answer) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(answer);
  });
});

/**
 * delete a comment from a post
 */

router.delete("/comment/remove", student, (req, res) => {});

export default router;
