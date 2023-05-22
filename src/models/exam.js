/**
 * Module dependencies
 */

 import mongoose from "mongoose";
 import{ Department} from "../controllers.js";
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
   departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ]
  
 });
 
/**
 * Pre hooks
 */
 schema.post("findOneAndDelete", function (doc, next) {
  doc.departments.forEach((department) => Department.removeExam(department, doc._id));
  next();
 })

 schema.pre("findOne", function () {
    // populate department
    this.populate("departments","-exams-__v");
  });

 schema.pre("find", function () {
    // populate department
    this.populate("departments","-exams-__v");
  });
 

 
 const Exam = model("Exam", schema);
 
 export default Exam;
 