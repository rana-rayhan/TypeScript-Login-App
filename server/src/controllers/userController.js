const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/userModel");
const ResetPwdModel = require("../models/resetPasswordModel");
const { successResponse } = require("../helpers/responseHelper");
const { secretKey } = require("../secret");
const { setAccessCookie } = require("../helpers/setCookie");
const sendEmail = require("../helpers/sendEmail");
//
//
// POST Method to register user ---***
// Endpoint: http://localhost:4000/api/user/register
const register = async (req, res, next) => {
  try {
    const { username, email, password, profile } = req.body;
    // Check if username or email exists in database
    const isUsername = await UserModel.findOne({ username: username });
    const isEmail = await UserModel.findOne({ email: email });
    if (isUsername) throw createHttpError(403, "Username already in use");
    if (isEmail) throw createHttpError(403, "Email already in use");

    const user = await UserModel.create({
      username: username,
      email: email,
      password,
      profile,
    });
    if (!user) throw createHttpError(403, "Registration unsuccessfull...!");

    return successResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST Method to login user ---***
// Endpoint: http://localhost:4000/api/user/login
const login = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createHttpError(403, "Wrong Password !");

    const userWithoutPwd = user.toObject();
    delete userWithoutPwd.password;
    delete userWithoutPwd.profile;

    // Creating jwt token and set token as cookie
    const token = jwt.sign({ userWithoutPwd }, secretKey, { expiresIn: "2h" });
    setAccessCookie(res, token);

    return successResponse(res, {
      statusCode: 200,
      message: "Login Successfull...!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET Method to fetch users ---***
// Endpoint: http://localhost:4000/api/user
const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    if (!users) throw createHttpError(404, "Users not found...!");

    return successResponse(res, {
      statusCode: 200,
      message: "Users are returned...!",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET Method to fetch single user ---***
// Endpoint: http://localhost:4000/api/user/:username
const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    if (!user) throw createHttpError(404, "User not found...!");

    const userWithoutPwd = user.toObject();
    delete userWithoutPwd.password;

    return successResponse(res, {
      statusCode: 200,
      message: "Users are returned...!",
      payload: userWithoutPwd,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// PUT Method to update user ---***
// Endpoint: http://localhost:4000/api/user/update-user
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    if (!updateUser) throw createHttpError(402, "User not updated...!");
    return successResponse(res, {
      statusCode: 201,
      message: "User is updated...!",
      payload: updateUser,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Forget user password || Post request
const handleForgetPassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await UserModel.findOne({ username });
    // creating otp and token
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // if user already have token then delete and create new one
    await ResetPwdModel.findOneAndDelete({ owner: user._id });

    const token = await ResetPwdModel.create({
      owner: user._id,
      token: otp,
    });
    if (!token) throw createHttpError(403, "Token Not Created...!");

    // prepair email for user activation
    const emailData = {
      email: user.email,
      subject: "Account Activation Email",
      message: `<h2> Hello ${user.username} ! Your OTP ${otp} !</h2>`,
    };
    // send email with node mailer
    sendEmail(emailData);

    return successResponse(res, {
      statusCode: 200,
      message: `Please check your email...!`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Reset user password || PUT request
const handleResetPassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    // created option
    const userEmail = { email: user.email };

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword)
      throw createHttpError(403, "You are using same password");
    // updated data
    const updatedData = { password: password };
    const updateOptions = { new: true };

    // find and update a user
    const updatedUser = await UserModel.findOneAndUpdate(
      userEmail,
      updatedData,
      updateOptions
    );
    if (!updatedUser) throw createHttpError(400, "User password reset failed");

    // prepair email for user activation
    const emailData = {
      email: user.email,
      subject: "Successfully Reset Password",
      message: `<h2> Hello ${user.username}, your password is reseted successfully ! </h2>`,
    };
    // send email with node mailer
    sendEmail(emailData);

    await ResetPwdModel.findOneAndDelete({ owner: user._id });
    // return users into response controller--**
    return successResponse(res, {
      statusCode: 200,
      message: "User password was Reset seccessfully",
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Logout user ---***
const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User is logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Export moduels ---***
module.exports = {
  register,
  login,
  getUser,
  getUsers,
  updateUser,
  handleForgetPassword,
  handleResetPassword,
  handleLogout,
};
