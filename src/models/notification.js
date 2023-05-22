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
    message: {
      type: Schema.Types.String,
      required: true,
    },
    department: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", schema);

export default Notification;
