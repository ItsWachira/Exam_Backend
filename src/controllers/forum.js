/**
 * Module dependencies
 */

import { Database } from "../controllers.js";
import { Forum } from "../models.js";
import { Debug } from "../utilities.js";

const db = new Database(Forum);

const updateAnswers = (id, answers) => {
  db.updateById(id, { $addToSet: { answers } }, (error, _) => {
    if (error) return Debug.database(["Forum", "[Comment] Not Added"]);
    Debug.database(["Forum", "[Comment] Added"]);
  });
};

export { updateAnswers };
