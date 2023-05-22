/**
 * Module dependencies
 */

import bcrypt from "bcrypt";
import mongoose from "mongoose";

/**
 *
 * @param {mongoose.Schema} schema
 * @param {*} options
 */

function authPlugin(schema) {
  schema.methods = {
    // hash password
    hashPassword: async function (password, callback) {
      try {
        const hash = await bcrypt.hash(password, 10);
        callback(null, hash);
      } catch (error) {
        console.log(error);
        callback(error);
      }
    },
    // check if password matches
    comparePassword: async function (password, callback) {
      try {
        const valid = await bcrypt.compare(password, this.password);
        return callback(null, valid);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  };

  schema.pre("save", function (next) {
    // hash password before saving it
    this.hashPassword(this.password, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  });

  schema.pre("findOneAndUpdate", function (next) {
    // if password does not exists, continue
    if (typeof this._update.password === "undefined") return next();

    // hash password before saving it
    this.schema.methods.hashPassword(this._update.password, (error, hash) => {
      if (error) return next(error);
      this._update.password = hash;
      next();
    });
  });
}

export { authPlugin };
