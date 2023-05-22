/**
 * Module dependencies
 */

import mongoose from 'mongoose';
import { Question } from '../controllers.js';

const { Schema, model } = mongoose;

/**
 * Define schema
 */

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  time: {
    type: Schema.Types.Number,
    required: true
  },
  department: {
    type: Schema.Types.String,
    required: true
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]
});

/**
 * Pre hooks
 */

schema.pre('findOne', function() {
  // populate questions
  this.populate('questions');
});

schema.pre('findOneAndUpdate', function(next) {
  const removed = this._update.removed;

  // remove quiz references in removed questions
  removed.forEach(id => Question.removeQuiz(id, this._conditions._id));

  next();
});

/**
 * Post hooks
 */

 schema.post('save', function(doc, next) {
  // save quiz references in questions
  doc.questions.forEach(question => Question.updateQuiz(question, doc._id));

  next();
});

schema.post('findOneAndUpdate', function(doc, next) {
  // get the new questions that have been updated
  // doc.questions contains previous questions before update
  const questions = this._update.$set.questions;

  // save quiz references in questions
  questions.forEach(question => Question.updateQuiz(question, doc._id));
  
  next();
});

schema.post('findOneAndDelete', function (doc, next) {
  // remove quiz references in questions
  doc.questions.forEach(question => Question.removeQuiz(question, doc._id));

  next();
});

const Quiz = model('Quiz', schema);

export default Quiz;
