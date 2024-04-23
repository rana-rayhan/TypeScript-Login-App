const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookie = require("cookie-parser");
const createError = require("http-errors");
const { errorResponse } = require("./helpers/responseHelper");
const userRouter = require("./routers/userRouters");
const app = express();

// path of build files for connect frontend and backend togather ---***
const path = require("path");
const _dirname = path.dirname("");
//
//
// Middlewares ---***
app.use(express.json());
// use express buildpath for start frontend in same PORT
const buildPath = path.join(_dirname, "../client/build");
//app.use(express.static(buildPath));
//
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookie());
//
//
// HTTP Request ---***
app.use("/api/user/", userRouter);
//
//
// HTTP client error response ---***
app.use((req, res, next) => {
  next(createError(404, "Bad request: Route Not Found---***"));
});
//
//
// HTTP Request handle server errors ---***
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
//
//
// export module ---***
module.exports = app;
