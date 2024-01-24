const userRouter = require("express").Router();
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  handleForgetPassword,
  handleResetPassword,
  handleLogout,
} = require("../controllers/userController");
const { isValidResetToken } = require("../middlewares/isValidResetToken");
const { isLoggedOut, isLoggedIn } = require("../middlewares/userAuth");
const { verifyUsername, handleUser } = require("../middlewares/verifyUser");
//
//
// Post Method ---***
userRouter.post("/register", isLoggedOut, register); // Register user
userRouter.post("/login", isLoggedOut, verifyUsername, login); // Login in app
userRouter.post("/verify-username", isLoggedOut, verifyUsername, handleUser); // check username
userRouter.post("/forget-password", isLoggedOut, handleForgetPassword); // Forget password user
// POST: /api/users/verify-token
userRouter.post(
  "/verify-token",
  isLoggedOut,
  isValidResetToken,
  (req, res, next) => {
    res.json({ success: true });
  }
);
userRouter.put(
  "/reset-password",
  isLoggedOut,
  isValidResetToken,
  handleResetPassword
); // Send OTP to user email
//
//
// Get Method ---***
userRouter.get("/", isLoggedIn, getUsers); // Get all users
userRouter.get("/logout", isLoggedIn, handleLogout); // Logout in app
userRouter.get("/:username", isLoggedIn, getUser); // Get users with username
//
//
// Put Method ---***
userRouter.put("/update-user/:userId", isLoggedIn, updateUser); // Update User Profile
//
//
// Delete Method ---***
// --- *** in progress.....
//
//
// Export module ---***
module.exports = userRouter;
