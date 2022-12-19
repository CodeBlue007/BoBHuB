const AWS = require("aws-sdk");
const awsS3Config = require("../config/aws-s3.config");

AWS.config.update(awsS3Config);

const s3 = new AWS.S3();
