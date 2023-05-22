/**
 * Module dependencies
 */

import mongoose from "mongoose";
import { Constants, Mongoose } from "../utilities.js";

const { Schema, model } = mongoose;
const { SUPPORT } = Constants.Admin;

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
  role: {
    type: Schema.Types.String,
    default: SUPPORT,
  },
  permissions: {
    type: Schema.Types.Array,
  },
  examPermissions: {
    type: Schema.Types.Array,
  },
  departmentPermissions: {
    type: Schema.Types.Array,
  },
  disabled: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

/**
 * Add custom plugin to schema
 * Instance methods for hashing and comparing password
 * Pre hooks for hashing password before saving it
 */

schema.plugin(Mongoose.authPlugin);

const Admin = model("Admin", schema);

export default Admin;
