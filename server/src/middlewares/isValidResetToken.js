const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const ResetPwdModel = require("../models/resetPasswordModel");
const { secretKey } = require("../secret");
const bcrypt = require("bcryptjs");
const { isObjectIdOrHexString } = require("mongoose");
const UserModel = require("../models/userModel");

const isValidResetToken = async (req, res, next) => {
  try {
    const { username, otp } = req.body;
    if (!otp || !username) throw createError(400, "Token not found...!");

    const user = await UserModel.findOne({ username });
    if (!user) throw createError(400, "User not found...!");

    const userOtp = await ResetPwdModel.findOne({ owner: user._id });
    if (!userOtp) throw createError(400, "User OTP not found...!");

    const isMatch = await bcrypt.compare(otp, userOtp.token);
    if (!isMatch) throw createError(400, "Invalid OTP...!");
    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isValidResetToken,
};
