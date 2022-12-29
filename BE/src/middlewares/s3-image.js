const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { awsS3Config } = require("../config/aws-s3.config");

AWS.config.update(awsS3Config);
const s3 = new AWS.S3();

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
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
  limits: { fileSize: 5 * 1024 * 1024 },
});

const imageDeleter = (location) => {
  let params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: location.split("/").slice(-2).join("/"),
  };

  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
        console.log("err: ", error, error.stack);
      } else {
        console.log(" 정상 삭제 되었습니다.");
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { imageUploader, imageDeleter };
