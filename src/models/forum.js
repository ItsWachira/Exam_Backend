/**
 * Module dependencies
 */

import mongoose from "mongoose";

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
    department: {
      type: Schema.Types.String,
      required: true,
    },
    subject: {
      type: Schema.Types.String,
      required: true,
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Pre hooks
 */

schema.pre("find", function () {
  // populate postedBy
  this.populate("postedBy", "name");
});

schema.pre("findOne", function () {
  // populate postedBy
  this.populate("postedBy", "name");
  // populate answers and answers postedBy
  this.populate({
    path: "answers",
    populate: { path: "postedBy" },
  });
});

const Forum = model("Forum", schema);

export default Forum;
