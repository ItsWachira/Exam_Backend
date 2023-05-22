/**
 * Module dependencies
 */

import { Database } from '../controllers.js';
import { Quiz } from '../models.js';
import { Debug } from '../utilities.js';

const db = new Database(Quiz);

/**
 * Remove question in quiz
 * @param {String} id 
 * @param {String} question 
 */

const removeQuestion = (id, question) => {
  db.updateOne({ _id: id }, { $pull: { questions: question } }, (error, _) => {
    if (error) return Debug.database(['Quiz', 'Question Not Removed']);
    Debug.database(['Quiz', 'Question Removed']);
  });
}

export { removeQuestion };
