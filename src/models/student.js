/**
 * Module dependencies
 */

import mongoose from "mongoose";
import { Mongoose } from "../utilities.js";

const { Schema, model } = mongoose;

/**
 * Define schema
 */

const schema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  phone: {
    type: Schema.Types.String,
  },
  resetPasswordCode: {
    type: Schema.Types.Number,
  },
});

/**
 * Add custom plugin to schema
 * Instance methods for hashing and comparing password
 * Pre hooks for hashing password before saving it
 */

schema.plugin(Mongoose.authPlugin);

const Student = model("Student", schema);

export default Student;
