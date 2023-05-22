/**
 * Module dependencies
 */

 import { Router } from "express";
 import { Database } from "../controllers.js";
 import TestSeries from "../models/testSeries.js";
 
 const router = Router();
 const db = new Database(TestSeries);
 
 /**
  * Get test TestSeries by id
  */
 
 router.get("/", (req, res) => {
   db.findById(req.query.id, (error, testSeries) => {
     if (error) return res.status(error.code).json(error.message);
     res.json(testSeries);
   });
 });
 
 /**
  * Get all TestSeries test
  */
 
 router.get("/all", (req, res) => {
   db.find(req.query, (error, testSeries) => {
     if (error) return res.status(error.code).json(error.message);
     res.json(testSeries);
   });
 });
 
 /**
  * Create a TestSeries tests
  */
 
 router.post("/new", (req, res) => {
   // res.json(req.body);
   const params = req.body;
   params.postedBy = params.user.username;
   db.create(params, (error, testSeries) => {
     if (error) return res.status(error.code||500).json(error.message);
     res.json(req.body, testSeries);
   });
 });
 
 /**
  * Update a TestSeries test
  */
 
 router.put("/update", (req, res) => {
  const params = req.body;
  params.updatedBy = params.user.username;
   db.updateById(req.query.id, req.body, (error, testSeries) => {
     if (error) return res.status(error.code).json(error.message);
     res.json(testSeries);
   });
 });
 /**
 * publish a testseries
 */
router.put("/publish", (req, res) => {
  const params = req.body;
  
  db.updateById(req.query.id, params, (error, testSeries) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(testSeries);
  });
});
 /**
 * lock a testseries
 */
router.put("/lock", (req, res) => {
  const params = req.body;
  
  db.updateById(req.query.id, params, (error, testSeries) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(testSeries);
  });
});
 
 /**
  * Delete a TestSeries test
  */
 
 router.delete("/delete", (req, res) => {
   db.deleteById(req.query.id, (error, testSeries) => {
     if (error) return res.status(error.code).json(error.message);
     res.json(testSeries);
   });
 });
 
 export default router;
 