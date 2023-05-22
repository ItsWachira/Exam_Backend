/**
 * Module dependencies
 */

import AWS from "aws-sdk";
import { Router } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import { Auth } from "../controllers.js";
import { Debug, S3Storage } from "../utilities.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const router = Router();

const { admin } = Auth;
const { IMAGES_FOLDER } = process.env;

/**
 * Multer custom disk storage
 *

const upload = multer({
  storage: diskStorage({
    destination: (_, __, callback) => {
      callback(null, IMAGES_FOLDER);
    },
    filename: function (_, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  })
}).single('image');
*/

/**
 * Multer S3 storage
 */

const upload = multer({
  storage: S3Storage(),
}).single("image");

/**
 * Upload an image
 */

router.post("/upload", admin, (req, res) => {
  upload(req, res, (error) => {
    if (error instanceof MulterError) {
      console.log(error);
    } else if (error) {
      console.log(error);
    }

    Debug.server(req.file.data.Location);
    res.send(req.file.data.Location);
  });
});

/**
 * Get an image
 */

router.get("/", (req, res) => {
  res.sendFile(path.resolve(IMAGES_FOLDER + req.query.filename));
});

/**
 * Delete an image
 */

router.delete("/delete", admin, (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.query.filename,
  };

  s3.deleteObject(params, (error, data) => {
    if (error) return res.status(500).json(error);
    res.json(data);
  });
});

export default router;
