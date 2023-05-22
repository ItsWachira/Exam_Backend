/**
 * Module dependencies
 */

import mongoose from "mongoose";
import { Forum } from "../controllers.js";

const { Schema, model } = mongoose;

/**
 * Define schema
 */

const schema = new Schema(
  {
    text: {
      type: Schema.Types.String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    forum: {
      type: Schema.Types.ObjectId,
      ref: "Forum",
      required: true,
    },
    upVotes: {
      type: Schema.Types.Number,
      default: 0,
    },
    downVotes: {
      type: Schema.Types.Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Post hooks
 */

schema.post("save", function (doc, next) {
  // save answer reference in forum
  Forum.updateAnswers(doc.forum, doc._id);

  next();
});

const Answer = model("Answer", schema);

export default Answer;
