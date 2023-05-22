import AWS from 'aws-sdk';
import path from 'path';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

class S3Storage {
  constructor() { }
  
  _handleFile(req, file, callback) {
    const extension = path.extname(file.originalname);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}${extension}`,
      Body: file.stream,
    }

    s3.upload(params, (error, data) => {
      if (error) {
        console.log(error);
        callback(error);
      }

      callback(null, { data });
    });
  }

  _removeFile(req, file, callback) {}
}

export default function() {
  return new S3Storage();
}
