import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const s3Upload = async (file: any) => {
  if (file) {
    const params = {
      Bucket: 'testbucket-for-nodejs',
      Key: file.originalname,
      Body: file.buffer,
    };
    return s3.upload(params).promise();
  }
};

export const s3Delete = async (name: string) => {
  const params = {
    Bucket: 'testbucket-for-nodejs',
    Key: name,
  };
  const media = await s3.getObject(params).promise();
  if (media) {
    return s3.deleteObject(params).promise();
  }
};
