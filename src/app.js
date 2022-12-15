const cors = require("cors");
const express = require("express");
require("./db");
const { categoryRouter } = require("./routers");

const { errorLogger, errorHandler } = require("./middlewares");

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를
// 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
// app.use("/api/group", groupRouter);
app.use("/api/category", categoryRouter);
// app.use("/api/comment", commentRouter);

// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(errorLogger);
app.use(errorHandler);

module.exports = { app };
