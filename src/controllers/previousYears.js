/**
 * Module dependencies
 */

import { Database } from "../controllers.js";
import { PreviousYears } from "../models.js";
import { Debug } from "../utilities.js";

const db = new Database(PreviousYears);

/**
 * Remove question in series
 * @param {String} id
 * @param {String} question
 */

const removeQuestion = (id, question) => {
  db.updateOne({ _id: id }, { $pull: { questions: question } }, (error, _) => {
    if (error) return Debug.database(["PreviousYears", "Question Not Removed"]);
    Debug.database(["PreviousYears", "Question Removed"]);
  });
};

export { removeQuestion };
