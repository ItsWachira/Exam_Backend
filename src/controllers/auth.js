/**
 * Module dependencies
 */

import jwt from 'jsonwebtoken';
import { Constants, Debug } from '../utilities.js';

const { JWT_SECRET } = process.env;
const { Admin } = Constants;

/**
 * Generate auth token
 * @param {Object} payload 
 */

const sign = payload => {
  return jwt.sign({ user: payload }, JWT_SECRET);
}

/**
 * Check for token in header, verify it and return user
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {(user: object)} callback
 */

const verify = (req, res, callback) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    const error = 'Token was not provided';
    Debug.auth(['Verification', error]);
    return res.status(400).json({ error });
  }

  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      Debug.auth(['Verification', error.message]);
      return res.status(403).json({ error });
    }

    Debug.auth(['Verification', 'Success']);
    callback(payload.user)
  });
}

/**
 * Middleware for authorizing master admin only
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const master = (req, res, next) => {
  verify(req, res, user => {
    if (user.admin !== Admin.MASTER) {
      const error = 'Forbidden, master required';
      Debug.auth(['Admin', `[${user.admin}] ${error}`]);
      return res.status(401).json({ error });
    }
  
    Debug.auth(['Admin', '[master] authorized']);
    req.user = user;
    next();
  });
}

/**
 * Middleware for authorizing master or senior admin
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const senior_ = (req, res, next) => {
  verify(req, res, user => {
    if (user.admin !== Admin.MASTER && user.admin !== Admin.SENIOR) {
      const error = 'Forbidden, master or senior required';
      Debug.auth(['Admin', `[${user.admin}] ${error}`]);
      return res.status(401).json({ error });
    }
  
    Debug.auth(['Admin', `[${user.admin}] authorized`]);
    req.user = user;
    next();
  });
}

const exam_admin= (req,res,next)=>{
  verify(req,res, user=>{
    if(user.admin !== Admin.MASTER && user.admin !== Admin.EXAM_ADMIN){
      const error = "Forbidden, master or exam_admin required";
      Debug.auth(['Admin',`[${user.admin}] ${error}`]);
      return res.status(401).json({error});
    }
  })
}

const department_admin= (req,res,next)=>{
  verify(req,res, user=>{
    if(user.admin == Admin.SUPPORT || user.admin == Admin.SENIOR){
      const error = "Forbidden, master or exam_admin or department_admin required";
      Debug.auth(['Admin',`[${user.admin}] ${error}`]);
      return res.status(401).json({error});
    }
  })
}
const senior= (req,res,next)=>{
  verify(req,res, user=>{
    if(user.admin == Admin.SUPPORT){
      const error = "Forbidden, master or exam_admin or department_admin or senior required";
      Debug.auth(['Admin',`[${user.admin}] ${error}`]);
      return res.status(401).json({error});
    }
  })
}
/**
 * Middleware for authorizing any admin
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const admin = (req, res, next) => {
  verify(req, res, user => {
    if (!user.admin) {
      const error = 'Forbidden, admin required';
      Debug.auth(['Admin', error]);
      return res.status(401).json({ error });
    }
  
    Debug.auth(['Admin', 'authorized']);
    req.user = user;
    next();
  });
}

/**
 * Middleware for authorizing a student
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const student = (req, res, next) => {
  verify(req, res, user => {
    if (!user.student) {
      const error = 'Forbidden, student required';
      Debug.auth(['Student', error]);
      return res.status(401).json({ error });
    }

    Debug.auth(['Student', 'authorized']);
    req.user = user;
    next();
  });
}

export { sign, master, senior, exam_admin,department_admin,admin, student };
