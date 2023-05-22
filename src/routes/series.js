/**
 * Module dependencies
 */

import { Router } from 'express';
import { Database } from '../controllers.js';
import { Series } from '../models.js';

const router = Router();
const db = new Database(Series);

/**
 * Get test series by id
 */

router.get('/', (req, res) => {
  db.findById(req.query.id, (error, series) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(series);
  });
});

/**
 * Get all test series
 */

router.get('/all', (req, res) => {
  db.find(req.query, (error, series) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(series);
  });
});

/**
 * Create a test series
 */

router.post('/new', (req, res) => {
  db.create(req.body, (error, series) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(series);
  });
});

/**
 * Update a test series
 */

router.put('/update', (req, res) => {
  db.updateById(req.query.id, req.body, (error, series) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(series);
  });
});

/**
 * Delete a test series
 */

router.delete('/delete', (req, res) => {
  db.deleteById(req.query.id, (error, series) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(series);
  });
});

export default router;
