/**
 * Module dependencies
 */

import { Database } from '../controllers.js';
import { Series } from '../models.js';
import { Debug } from '../utilities.js';

const db = new Database(Series);

/**
 * Remove question in series
 * @param {String} id 
 * @param {String} question 
 */

const removeQuestion = (id, question) => {
  db.updateOne({ _id: id }, { $pull: { questions: question } }, (error, _) => {
    if (error) return Debug.database(['Series', 'Question Not Removed']);
    Debug.database(['Series', 'Question Removed']);
  });
}

export { removeQuestion };
