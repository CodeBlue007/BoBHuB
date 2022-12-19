const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { awsS3Config } = require("../config/aws-s3.config");

AWS.config.update(awsS3Config);
const s3 = new AWS.S3();

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

// const uploadDirectory =()=>{

// }

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bob-hub",
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? "default";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

module.exports = { imageUploader };
