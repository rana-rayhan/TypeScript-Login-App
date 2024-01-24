const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//
//
// User Schema ---***
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  isVerified: { type: Boolean, default: false },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  mobile: { type: String, default: null },
  address: { type: String, default: null },
  profile: { type: String, default: null },
});
//
// User Model ---***
const UserModel = mongoose.model("User", UserSchema);
//
// Export User Model ---***
module.exports = UserModel;
