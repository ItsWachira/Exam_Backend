/**
 * Module dependencies
 */

 import mongoose from "mongoose";

 import { Chapter } from "../controllers.js";
 
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
   chapter:{
    type:Schema.Types.ObjectId,
    ref:"Chapter"
   }
  
 });
 
 schema.pre("findOne", function () {
    // populate department
    this.populate("chapter","-topics -subject -__v -_id");
  });
 /**
 * Post hooks
 */

schema.post("save", function (doc, next) {
  // save topic references in subjects
  const chapter=doc.chapter
Chapter.UpdateTopics(chapter,doc._id)

  next();
});
schema.post("findOneAndDelete", function (doc, next) {
  // remove topic references in subjects
  const chapter=doc.chapter
Chapter.removeTopics(chapter,doc._id) 

  next();
});

schema.post("findOneAndUpdate", function (doc, next) {
  // get the new exams that have been updated
  // doc.questions contains previous questions before update
  const chapter=doc.chapter
  Chapter.UpdateTopics(chapter,doc._id) 
  
    next()
  
});
 
 const Topic = model("Topic", schema);
 
 export default Topic;
 