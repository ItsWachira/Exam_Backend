/**
 * Module dependencies
 */

import mongoose from "mongoose";
import { Question } from "../controllers.js";

const { Schema, model } = mongoose;

/**
 * Define schema
 */

const schema = new Schema({
  name: {
    en: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      default: "",
    },
  },
  display: {
    type: Schema.Types.Boolean,
    default: false,
  },
  time: {
    type: Schema.Types.Number,
    required: true,
  },
  mode: {
    type: Schema.Types.String,
    required: true,
  },
  marks: {
    type: Schema.Types.Number,
    required: true,
  },
  instructions: {
    en: { type: Schema.Types.String },
  },
  department: {
    type: Schema.Types.String,
    required: true,
  },
  exam: {
    type: Schema.Types.String,
    required: true,
  },
  lock: {
    type: Schema.Types.Boolean,
    default: false,
  },
  publish: {
    type: Schema.Types.Boolean,
    default: false,
  },
  publishedBy: {
    type: Schema.Types.String,
  },
  postedBy: {
    type: Schema.Types.String,
    // required: true,
  },
  updatedBy: {
    type: Schema.Types.String,
  },
  sections_: [
    {
      name: {
        type: Schema.Types.String,
      },
      compulsory: {
        type: Schema.Types.String,
      },
      tackle: {
        type: Schema.Types.Number,
      },
      questions: [
        {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
      ],
    },
  ],
});

/**
 * Pre hooks
 */

schema.pre("findOne", function () {
  // populate questions
  this.populate("sections_.questions");
});

schema.pre("findOneAndUpdate", function (next) {
  const removed = this._update.removed;

  // remove TestSeries references in removed questions
  // removed.forEach((id) =>
  //   Question.removeSeries(id, this._conditions._id)
  // );

  next();
});

/**
 * Post hooks
 */

schema.post("save", function (doc, next) {
  // saveTestSeries references in questions
  doc.sections_.map((section) => {
    section.questions.forEach((question) =>
      Question.updateSeries(question, doc._id)
    );
  });

  next();
});

schema.post("findOneAndUpdate", function (doc, next) {
  // get the new questions that have been updated
  // doc.questions contains TestSeries questions before update
  const sections = this._update.$set.sections_;

  // save TestSeries references in questions
  //  sections.map((section)=>{
  // section.questions.forEach((question) =>
  //    Question.updateSeries(question, doc._id)
  //  );
  //  })

  next();
});

schema.post("findOneAndDelete", function (doc, next) {
  // remove series references in questions
  doc.sections_.map((section) => {
    section.questions.forEach((question) =>
      Question.removeSeries(question, doc._id)
    );
  });

  next();
});

const TestSeries = model("TestSeries", schema);

export default TestSeries;
