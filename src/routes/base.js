/**
 * Module dependencies
 */

import { Router } from "express";
import { Database } from "../controllers.js";
import Department from "../models/department.js";
import Exam from "../models/exam.js";
import Subject from "../models/subject.js";
import Topic from "../models/topic.js";
import Chapter from "../models/chapter.js";
const router = Router();
const exam_db = new Database(Exam);
const department_db = new Database(Department);
const subject_db = new Database(Subject);
const topic_db = new Database(Topic);
const chapter_db=new Database(Chapter);

/**
 * Get test series by id
 */

router.get("/exam", (req, res) => {
  exam_db.findById(req.query.id, (error, exams) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(exams);
  });
});
router.get("/department", (req, res) => {
  department_db.findById(req.query.id, (error, departments) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(departments);
  });
});
router.get("/subject", (req, res) => {
  subject_db.findById(req.query.id, (error, subjects) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(subjects);
  });
});
router.get("/topic", (req, res) => {
  topic_db.findById(req.query.id, (error, topics) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(topics);
  });
});

router.get("/chapter", (req, res) => {
  chapter_db.findById(req.query.id, (error, chapter) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(chapter);
  });
});

/**
 * Get all test series
 */

//  router.get("/all", (req, res) => {
//   const { mode, sort, ...rest } = req.query;

//   let modeFilter;
//   let options = {};

//   if (mode === "answer") modeFilter = { answer: { $ne: "" } };
//   if (mode === "choices") modeFilter = { answer: { $eq: "" } };
//   if (sort) options.sort = sort;

//   const params = { ...modeFilter, ...rest };

//   db.find(
//     params,
//     (error, questions) => {
//       if (error) return res.status(error.code).json(error.message);
//       res.json(questions);
//     },
//     options
//   );
// });


router.get("/all/exam", (req, res) => {
  exam_db.find(req.query, (error, exams) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(exams);
  });
});
router.get("/all/department", (req, res) => {
  department_db.find(req.query, (error, departments) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(departments);
  });
});
router.get("/all/subject", (req, res) => {
  subject_db.find(req.query, (error, subjects) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(subjects);
  });
});

router.get("/all/topic", (req, res) => {
  topic_db.find(req.query, (error, topics) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(topics);
  });
});

router.get("/all/chapter", (req, res) => {
  chapter_db.find(req.query, (error, chapters) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(chapters);
  });
});
/**
 * Create a test series
 */

router.post("/new", (req, res) => {
  const type = req.body.type;
  if (type == "exam") {
    console.log(req.body);
    exam_db.create(req.body, (error, exams) => {
      if (error) return res.status(error.code || 500).json(error.message);
      res.json(exams);
    });
  }
  if (type == "department") {
    department_db.create(req.body, (error, departments) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(departments);
    });
  }
  if (type == "subject") {
    subject_db.create(req.body, (error, subjects) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(subjects);
    });
  }
  if (type == "topic") {
    topic_db.create(req.body, (error, topics) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(topics);
    });
  }
  if (type == "chapter") {
    chapter_db.create(req.body, (error, chapters) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(chapters);
    });
  }
});

/**
 * Update 
 */

router.put("/update/exam", (req, res) => {
  exam_db.updateById(req.query.id, req.body,(error, exams) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(exams);
    }); 
});
router.put("/update/department", (req, res) => {
  department_db.updateById(req.query.id, req.body, (error, departments) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(departments);
  }) 
});

router.put("/update/subject", (req, res) => {
  subject_db.updateById(req.query.id,req.body, (error, subjects) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(subjects);
    }); 
});

router.put("/update/topic", (req, res) => {
   topic_db.updateById(req.query.id,req.body, (error, topics) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(topics);
    });
});

router.put("/update/chapter", (req, res) => {
  chapter_db.updateById(req.query.id,req.body, (error, chapter) => {
     if (error) return res.status(error.code).json(error.message);
     res.json(chapter);
   });
});

/**
 * Delete a test series
 */

router.delete("/delete/exam", (req, res) => {
  exam_db.deleteById(req.query.id, (error, exams) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(exams);
  });
});
router.delete("/delete/department", (req, res) => {
  department_db.deleteById(req.query.id, (error, departments) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(departments);
  });
});
router.delete("/delete/subject", (req, res) => {
  subject_db.deleteById(req.query.id, (error, subjects) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(subjects);
  });
});

router.delete("/delete/topic", (req, res) => {
  topic_db.deleteById(req.query.id, (error, topics) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(topics);
  });
});

router.delete("/delete/chapter", (req, res) => {
  chapter_db.deleteById(req.query.id, (error, chapter) => {
    if (error) return res.status(error.code).json(error.message);
    res.json(chapter);
  });
});

export default router;
