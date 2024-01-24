const createHttpError = require("http-errors");
const UserModel = require("../models/userModel");
const { successResponse } = require("../helpers/responseHelper");
//
//
// VerifyUsername middlaware
const verifyUsername = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) throw createHttpError(404, "User is not exist...!");

    // sending user to next controller
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
//
//
// VerifyUsername middlaware
const handleUser = async (req, res, next) => {
  const { username, profile } = req.user;
  try {
    successResponse(res, {
      statusCode: 200,
      message: "Valid user name...!",
      payload: { username: username, profile },
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Exports Module
module.exports = {
  verifyUsername,
  handleUser,
};
