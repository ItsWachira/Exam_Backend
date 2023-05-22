/**
 * Module dependencies
 */

import { Database } from "../controllers.js";
import { Question } from "../models.js";
import { Debug } from "../utilities.js";

const db = new Database(Question);

/**
 * Add previousYears id to previousYears field
 * @param {String} id
 * @param {String} previousYears
 */
const updatePreviousYears = (id, previousYears) => {
  db.updateById(id, { $addToSet: { previousYears } }, (error, _) => {
    if (error) return Debug.database(["Question", "[PreviousYears]Not Added"]);
    Debug.database(["Question", "[PreviousYears]Added"]);
  });
};
/**
 * Remove previousYears id from previous field
 * @param {String} id
 * @param {String} series
 */
const removePreviousYears = (id, previousYears) => {
  db.updateById(id, { $pull: { previousYears } }, (error, _) => {
    if (error)
      return Debug.database(["Question", "[PreviousYears]Not Removed"]);
    Debug.database(["Question", "[PreviousYears] Removed"]);
  });
};

/**
 * Add series id to series field
 * @param {String} id
 * @param {String} series
 */

const updateSeries = (id, series) => {
  db.updateById(id, { $addToSet: { series } }, (error, _) => {
    if (error) return Debug.database(["Question", "[Series] Not Added"]);
    Debug.database(["Question", "[Series] Added"]);
  });
};

/**
 * Remove series id from series field
 * @param {String} id
 * @param {String} series
 */

const removeSeries = (id, series) => {
  db.updateById(id, { $pull: { series } }, (error, _) => {
    if (error) return Debug.database(["Question", "[Series] Not Removed"]);
    Debug.database(["Question", "[Series] Removed"]);
  });
};

/**
 * Add quiz id to quizzes field
 * @param {String} id
 * @param {String} quizzes
 */

const updateQuiz = (id, quizzes) => {
  db.updateById(id, { $addToSet: { quizzes } }, (error, _) => {
    if (error) return Debug.database(["Question", "[Quiz] Not Added"]);
    Debug.database(["Question", "[Quiz] Added"]);
  });
};

/**
 * Remove quiz id from quizzes field
 * @param {String} id
 * @param {String} quizzes
 */

const removeQuiz = (id, quizzes) => {
  db.updateById(id, { $pull: { quizzes } }, (error, _) => {
    if (error) return Debug.database(["Question", "[Quiz] Not Removed"]);
    Debug.database(["Question", "[Quiz] Removed"]);
  });
};

export {
  updateSeries,
  removeSeries,
  updateQuiz,
  removeQuiz,
  updatePreviousYears,
  removePreviousYears,
};
