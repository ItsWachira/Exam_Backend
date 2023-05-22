
import { Database } from "../controllers.js";
import Department from "../models/department.js";

const db= new Database (Department);
/**
 * Remove exam in department
 * @param {String} id 
 * @param {String} exam 
 */

 const removeExam = (id, exams) => {
    db.updateOne({ _id: id }, { $pull: { exams: exams} }, (error, _) => {
      if (error) console.log(error)
    });
  }
  /**
 * Add subject id to subjects field
 * @param {String} id
 * @param {String} subjects
 */

const UpdateSubjects=(id,subjects)=>{
    db.updateById(id,{$addToSet:{subjects}},(error,response)=>{
        if(error){console.log(error)}
    })
}

/**
 * Remove subject id from subjects field
 * @param {String} id
 * @param {String} subjects
 */

const removeSubjects =(id,subjects)=>{
    db.updateById(id,{$pull:{subjects}},(error,_)=>{
        if(error){console.log(error)}
    })
}
  export { removeExam,UpdateSubjects,removeSubjects};