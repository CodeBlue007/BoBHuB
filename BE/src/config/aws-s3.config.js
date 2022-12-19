module.exports = {
  awsS3Config: {
    region: "ap-northeast-2",
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY_PASSWORD,
  },
};
