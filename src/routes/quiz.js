/**
 * Module dependencies
 */

import { Router } from 'express';
import { Database } from '../controllers.js';
import { Quiz } from '../models.js';

const router = Router();
const db = new Database(Quiz);

/**
 * Get quiz by Id
 */

 router.get('/', (req, res) => {
  db.findById(req.query.id, (error, quiz) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(quiz);
  });
});

/**
 * Get all quizzes
 */

 router.get('/all', (req, res) => {
  db.find(req.query, (error, quizzes) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(quizzes);
  });
});

/**
 * Create a new quiz
 */

router.post('/new', (req, res) => {
  db.create(req.body, (error, quiz) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(quiz);
  });
});

/**
 * Update a quiz by Id
 */

 router.put('/update', (req, res) => {
  db.updateById(req.query.id, req.body, (error, quiz) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(quiz);
  });
});

/**
 * Delete a quiz by Id
 */

router.delete('/delete', (req, res) => {
  db.deleteById(req.query.id, (error, quiz) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(quiz);
  });
});

export default router;
