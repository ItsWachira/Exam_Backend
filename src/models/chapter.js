/**
 * Module dependencies
 */

 import mongoose from "mongoose";
 import { Subject } from "../controllers.js";
 
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
   subject:{
    type:Schema.Types.ObjectId,
    ref:"Subject"
   },
   topics:[{
    type:Schema.Types.ObjectId,
    ref:"Topic"
   }]
  
 });
 
 schema.pre("findOne", function () {
    // populate department
    this.populate("subject","-chapters -topics -departments -__v");
    this.populate("topics"," -__v -chapter ")
  });
 schema.pre("find", function () {
    // populate department
    // this.populate("subject","-chapters -topics -departments -__v");
    this.populate("topics"," -__v -chapter ")
  });
 /**
 * Post hooks
 */

schema.post("save", function (doc, next) {
  // save topic references in subjects
  const subject=doc.subject
Subject.UpdateChapters(subject,doc._id)

  next();
});
schema.post("findOneAndDelete", function (doc, next) {
  // remove topic references in subjects
  const subject=doc.subject
Subject.removeChapters(subject,doc._id) 

  next();
});

schema.post("findOneAndUpdate", function (doc, next) {
  // get the new exams that have been updated
  // doc.questions contains previous questions before update
  const subject=doc.subject
  Subject.UpdateChapters(subject,doc._id) 
  
    next()
  
});
 
 const Chapter = model("Chapter", schema);
 
 export default Chapter;
 