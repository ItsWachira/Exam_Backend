import Chapter from "../models/chapter.js";
import { Database } from "../controllers.js";
const db = new Database(Chapter);
/**
 * Add topic id to topics field
 * @param {String} id
 * @param {String} topics
 */

 const UpdateTopics = (id, topics) => {
    db.updateById(id, { $addToSet: { topics } }, (error, _) => {
      if (error) {
        console.log(error);
      }
    });
  };
  
  /**
   * Remove topic id from topics field
   * @param {String} id
   * @param {String} subjects
   */
  
  const removeTopics = (id, topics) => {
    db.updateById(id, { $pull: { topics } }, (error, _) => {
      if (error) {
        console.log(error);
      }
    });
  };
  export{UpdateTopics,removeTopics};