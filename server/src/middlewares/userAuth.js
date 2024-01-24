const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../secret");
//
//
// Middlaware for check user logged or not ---***
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw createHttpError(403, "Please login or register...!");

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
};
//
//
// Middlaware for check user logged or not ---***
const isLoggedOut = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (token) throw createHttpError(403, "User is already logged in...!");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
