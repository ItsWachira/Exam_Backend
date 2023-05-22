/**
 * Module dependencies
 */

import mongoose from "mongoose";
import { Exam } from "../controllers.js";
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
  exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

schema.pre("findOne", function () {
  // populate exams
  this.populate("exams", "-departments-__v");
  this.populate("subjects");
});
schema.pre("find", function () {
  // populate exams
  // this.populate("exams", "-departments-__v");
  this.populate("subjects","-departments -chapters -topics");
});
/**
 * Post hooks
 */

schema.post("save", function (doc, next) {
  // save department references in Exams
  doc.exams.forEach((exam) => Exam.UpdateDepartment(exam, doc._id));

  next();
});
schema.post("findOneAndDelete", function (doc, next) {
  // remove department references in exam
  doc.exams.forEach((exam) => Exam.removeDepartment(exam, doc._id));

  next();
});

schema.post("findOneAndUpdate", function (doc, next) {
  // get the new exams that have been updated
  // doc.questions contains previous questions before update
  doc.exams.forEach((exam) => {
    Exam.UpdateDepartment(exam, doc._id);
  });

  next();
});

schema.post("findOneAndDelete", function (doc, next) {
  doc.subjects.forEach((subject) => Subject.removeDepartment(subject, doc._id));
  next();
 })

const Department = model("Department", schema);

export default Department;
