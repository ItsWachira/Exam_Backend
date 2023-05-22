
import { Database } from "../controllers.js";
import Exam from "../models/exam.js";
import { Debug } from "../utilities.js";

const db= new Database (Exam);
/**
 * Add department id to departments field
 * @param {String} id
 * @param {String} departments
 */

const UpdateDepartment=(id,departments)=>{
    db.updateById(id,{$addToSet:{departments}},(error,response)=>{
        if(error){console.log(error)}
    })
}

/**
 * Remove deprtment id from departments field
 * @param {String} id
 * @param {String} departments
 */

const removeDepartment =(id,departments)=>{
    db.updateById(id,{$pull:{departments}},(error,_)=>{
        if(error)return Debug.database(["Exam", "[department] Not Removed"]);
    })
}
export{ UpdateDepartment,removeDepartment};