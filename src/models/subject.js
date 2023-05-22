/**
 * Module dependencies
 */

 import mongoose from "mongoose";
 import { Department } from "../controllers.js";
 const { Schema, model } = mongoose;
 
 /**
  * Define schema
  */
 
 const schema = new Schema({
   code: {
     type: Schema.Types.String,
     required: true,
     unique: true,
   },
   title: {
     type: Schema.Types.String,
     required: true,
   },
   departments:[{
    type:Schema.Types.ObjectId,
    ref:"Department"
   }],
   topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    }],
   chapters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    }]
  
 });
 schema.pre("findOne", function () {
    // populate department
    this.populate("departments","-exams -subjects  -__v -_id");
    this.populate("topics","-subject -__v -_id");
    this.populate("chapters","-subject -__v ");
  });
 schema.pre("find", function () {
    // populate department
    // this.populate("departments","-exams -subjects  -__v -_id");
    this.populate("topics","-subject -__v -_id");
    this.populate("chapters","-subject -__v ");
  });
  /**
 * Post hooks
 */

schema.post("save", function (doc, next) {
  // save department references in Exams
  doc.departments.forEach((department) => Department.UpdateSubjects(department, doc._id));

  next();
});

schema.post("findOneAndDelete", function (doc, next) {
  // remove department references in exam
  doc.departments.forEach((department) => Department.removeSubjects(department, doc._id));

  next();
});
schema.post("findOneAndUpdate", function (doc, next) {
  doc.departments.forEach((department) => {
    Department.UpdateSubjects(department, doc._id);
  });

  next();
})

 
 const Subject = model("Subject", schema);
 
 export default Subject;
 