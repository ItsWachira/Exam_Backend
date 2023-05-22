/**
 * Module dependencies
 */

import { Auth, Database } from "../controllers.js";

import { Question } from "../models.js";
import { Router } from "express";

const router = Router();
const db = new Database(Question);

const { master, admin, senior } = Auth;

/**
 * Get a specific question by Id
 */

router.get("/", (req, res) => {
  const { id, step } = req.query;
  if (step === "next") {
    db.find(
      { _id: { $gt: id } },
      (error, question) => {
        if (error) return res.status(error.code).json(error.message);
        return res.json(question);
      },
      { limit: 1 }
    );
  }

  if (step === "previous") {
    db.find(
      { _id: { $lt: id } },
      (error, question) => {
        if (error) return res.status(error.code).json(error.message);
        return res.json(question);
      },
      { limit: 1 }
    );
  }

  if (step === "current") {
    db.findById(req.query.id, (error, question) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(question);
    });
  }
});

/**
 * Get all questions
 */

router.get("/all", (req, res) => {
  const { mode, sort, ...rest } = req.query;

  let modeFilter;
  let options = {};

  if (mode === "answer") modeFilter = { answer: { $ne: "" } };
  if (mode === "choices") modeFilter = { answer: { $eq: "" } };
  if (sort) options.sort = sort;

  const params = { ...modeFilter, ...rest };
  // console.log(params);

  db.find(
    params,
    (error, questions) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(questions);
      // console.log(questions);
    },
    options
  );
});

/**
 * Create a new question
 */

router.post("/new", admin, (req, res) => {
  const params = req.body;
  params.postedBy = params.user.username;
  // console.log(params);

  db.create(params, (error, question) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(question);
  });
});

/**
 * Update a question
 */

router.put("/update",  (req, res) => {
  const params = req.body;
  params.updatedBy = params.user.username;
  

  db.updateById(req.query.id, params, (error, question) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(question);
  });
});

/**
 * Review a question
 */

// router.put("/review", senior, (req, res) => {
//   const params = { reviewedBy: req.body.user.username };

//   db.updateById(req.query.id, params, (error, question) => {
//     if (error) return res.status(error.code).json(error.message);
//     res.json(question);
//   });
// });

/**
 * Publish a question
 */

router.put("/publish", master, (req, res) => {
  db.updateById(req.query.id, req.body, (error, question) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(question);
  });
});

/**
 * Delete a question
 */

router.delete("/delete", master, (req, res) => {
  db.deleteById(req.query.id, (error, question) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(question);
  });
});
/**
 * user Solution
 */
router.put("/userSolution", (req, res) => {
  const params = { userSolution: req.body };
  db.updatedById(req.query.id, params, (error, question) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(question);
  });
});
/**
 * upvote Solution
 */
router.put("/upvote", (req, res) => {
  const params = { vote: true, userId: req.user._id };
  db.updatedById(req.query.id, params, (error, question) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(question);
  });
});

export default router;
