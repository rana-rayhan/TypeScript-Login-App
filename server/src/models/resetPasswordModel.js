const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

const ResetPwdModel = mongoose.model("Reset-password-token", resetTokenSchema);
module.exports = ResetPwdModel;
