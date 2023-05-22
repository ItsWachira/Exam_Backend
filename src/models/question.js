/**
 * Module dependencies
 */

import mongoose from "mongoose";
import { Image, Quiz, Series } from "../controllers.js";

const { Schema, model } = mongoose;

/**
 * Define schema
 */

const schema = new Schema({
  text: {
   en: {type: Schema.Types.String,
    default:""},
   hn: {type: Schema.Types.String,
    default:""}
  },
  mode: {
    type: Schema.Types.String,
  },
  images: [
    {
      type: Schema.Types.String,
    },
  ],
  choices: [
    {
      text: {
        en: {type: Schema.Types.String,
          default:""},
         hn: {type: Schema.Types.String,
          default:""}
      },
      image: {
        type: Schema.Types.String,
      },
      answer: {
        type: Schema.Types.Boolean,
      },
    },
  ],
  answer: {
    en: {type: Schema.Types.String,
      default:""},
     hn: {type: Schema.Types.String,
      default:""}
  },
  marks: {
    type: Schema.Types.Number,
    // required: true,
  },
  marks_: {
    positive: {
      type: Schema.Types.String,
      default: "",
      // required: true,
    },
    negative: {
      type: Schema.Types.String,
      default: "",
      // required: true
    },
  },
  solution: {
    text: {
      en: {type: Schema.Types.String,
        default:""},
       hn: {type: Schema.Types.String,
        default:""}
    },

    image: {
      type: Schema.Types.String,
    },
    video: {
      type: Schema.Types.String,
      default: "",
    },
    images: [
      {
        type: Schema.Types.String,
      },
    ],
    userSolution: {
      postedBy: {
        type: Schema.Types.String,
      },
      text: {
        en: {type: Schema.Types.String,
          default:""},
         hn: {type: Schema.Types.String,
          default:""}
      },
      image: {
        type: Schema.Types.String,
      },
      images: [
        {
          type: Schema.Types.String,
        },
      ],
      upvote: {
        vote: {
          type: Schema.Types.Boolean,
          default: false,
        },
        userId: {
          type: Schema.Types.String,
        },
      },
    },
  },
  publish: {
    type: Schema.Types.Boolean,
    default: true,
  },
  publishedBy: {
    type: Schema.Types.String,
  },
  department: {
    type: Schema.Types.String,
    required: true,
  },
  department_: {
    type: Schema.Types.ObjectId,
    ref: "Department" 
  },
  exam: {
    type: Schema.Types.String,
    required: true,
  },
  exam_: {
    type: Schema.Types.ObjectId,
      ref: "Exam" 
  },
  subject: {
    type: Schema.Types.String,
    required: true,
  },
  subject_: {
    type: Schema.Types.ObjectId,
      ref: "Subject"  
  },
  chapter: {
    type: Schema.Types.String,
    // required: true,
  },
  chapter_: {
    type: Schema.Types.ObjectId,
    ref: "Chapter" 
  },
  topic: {
    type: Schema.Types.String,
    // required: true,
  },
  topic_: {
    type: Schema.Types.ObjectId,
    ref: "Topic" 
  },
  level: {
    type: Schema.Types.String,
    // required: true,
  },
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  set: {
    type: Schema.Types.Number,
  },
  postedBy: {
    type: Schema.Types.String,
    required: true,
  },
  updatedBy: {
    type: Schema.Types.String,
  },
  // reviewedBy: {
  //   type: Schema.Types.String,
  // },
  series: [
    {
      type: Schema.Types.ObjectId,
      ref: "Series",
    },
  ],
  testSeries: [
    {
      type: Schema.Types.ObjectId,
      ref: "testSeries",
    },
  ],
  previousYears: [
    {
      type: Schema.Types.ObjectId,
      ref: "previousYears",
    },
  ],
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  // review: {
  //   type: Schema.Types.Boolean,
  //   default: false,
  // },
});

/**
 * Pre hooks
 */

schema.pre("findOne", function () {
  this.populate("subject_","-__v -chapters -topics -departments")
  this.populate("chapter_",)
  this.populate("topic_",)
  // // get who posted question
  // this.populate("postedBy", "username");

  // // get last admin who updated question
  // this.populate("updatedBy", "username");

  // // get who reviewed question
  // this.populate("reviewedBy", "username");
});

schema.pre("find",function(){
  this.populate("subject_","-__v -chapters -topics -departments")
})

/**
 * Post hooks
 */

schema.post("findOneAndDelete", function (doc, next) {
  // delete question images
  doc.images.forEach((image) => Image.remove(image));

  // delete each choice's image
  doc.choices.forEach((choice) => Image.remove(choice.image));

  // delete solution image
  Image.remove(doc.solution.image);

  // remove question reference from all series
  doc.series.forEach((series) => Series.removeQuestion(series, doc._id));

  // remove question reference from all quizzes
  doc.quizzes.forEach((quiz) => Quiz.removeQuestion(quiz, doc._id));

  next();
});

const Question = model("Question", schema);

export default Question;
