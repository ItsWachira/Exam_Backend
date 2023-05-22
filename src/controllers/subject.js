import { Database } from "../controllers.js";
import Subject from "../models/subject.js";
import { departments } from "../utilities.js";

const db = new Database(Subject);
/**
 * Remove department in subject
 * @param {String} id
 * @param {String} subject
 */
const removeDepartment = (id, departments) => {
  db.updateOne(
    { _id: id },
    { $pull: { departments: departments } },
    (error, _) => {
      if (error) console.log(error);
    }
  );
};
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
/**
 * Add chapter id to chapters field
 * @param {String} id
 * @param {String} chapters
 */

const UpdateChapters = (id, chapters) => {
  db.updateById(id, { $addToSet: { chapters } }, (error, _) => {
    if (error) {
      console.log(error);
    }
  });
};

/**
 * Remove chapter id from chapters field
 * @param {String} id
 * @param {String} chapters
 */

const removeChapters = (id, chapters) => {
  db.updateById(id, { $pull: { chapters } }, (error, _) => {
    if (error) {
      console.log(error);
    }
  });
};

export {
  removeDepartment,
  removeTopics,
  UpdateTopics,
  UpdateChapters,
  removeChapters,
};
