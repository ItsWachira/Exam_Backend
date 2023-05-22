/**
 * Module dependencies
 */


import mongoose from "mongoose";
import { Debug } from "../utilities.js";

/**
 * Database class that exposes mongoose methods
 * Must be used with a mongoose model to work
 * Usage: new Database(Model)
 */

class Database {
  /**
   * Constructor
   * @param {mongoose.Model<mongoose.Document<any>>} Model
   */

  constructor(Model) {
    this.Model = Model;
    this.Tag = Model.modelName;
  }

  /**
   * Create new document
   * @param {Object} data
   * @param {(error, response)} callback
   */

  async create(data, callback) {
    try {
      const document = await this.Model.create(data);
      Debug.database([this.Tag, "Created"]);
      callback(null, document);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }

  /**
   * Find documents matching params
   * @param {Object} params
   * @param {(error, response)} callback
   * @param {Object} options
   */

  async find(params, callback, options = {}) {
    try {
      let documents = await this.Model.find(params, options.fields).sort(
        options.sort
      );
      if (options.limit) {
        documents = await this.Model.find(params, options.fields)
          .sort(options.sort)
          .limit(parseInt(options.limit));
      }
      Debug.database([this.Tag, "Fetched"]);
      callback(null, documents);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }

  /**
   * Find documents by id
   * @param {String} id
   * @param {(error, response)} callback
   */

  async findById(id, callback) {
    try { 
      const document = await this.Model.findById(id);
      Debug.database([this.Tag, "Fetched"]);
      callback(null, document);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }

  /**
   * Find one document matching params
   * @param {Object} params
   * @param {(error, response)} callback
   */

  async findOne(params, callback) {
    try {
      const document = await this.Model.findOne(params);
      Debug.database([this.Tag, "Fetched"]);
      callback(null, document);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }

  /**
   * Update document by id
   * @param {String} id
   * @param {Object} data
   * @param {(error, result)} callback
   */

  async updateById(id, data, callback) {
    try {
      const document = await this.Model.findByIdAndUpdate(id, data);
      Debug.database([this.Tag, "Updated"]);
      callback(null, document);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }

  /**
   * Update one document
   * @param {Object} params
   * @param {Object} data
   * @param {(error, result)} callback
   */

  async updateOne(params, data, callback) {
    try {
      const document = await this.Model.updateOne(params, data);
      Debug.database([this.Tag, "Updated"]);
      callback(null, document);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }

  /**
   * Delete document by id
   * @param {String} id
   * @param {(error, response)} callback
   */

  async deleteById(id, callback) {
    try {
      const document = await this.Model.findByIdAndDelete(id);
      Debug.database([this.Tag, "Deleted"]);
      callback(null, document);
    } catch (error) {
      console.log(error);
      callback({ code: 400, message: error });
    }
  }
}

export default Database;
