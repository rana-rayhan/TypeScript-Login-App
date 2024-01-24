require("dotenv").config();
//
// server port
const PORT = process.env.PORT || 3000;
//
// server port
const secretKey = process.env.SECRECT_KEY;
// database url
const db_url = process.env.DB_URL || "mongodb://localhost:27017";
const SMTP_USERNAME = process.env.SMTP_NAME;
const SMTP_PASSWORD = process.env.SMTP_PWD;
//
// module exporting
module.exports = {
  PORT,
  db_url,
  secretKey,
  SMTP_USERNAME,
  SMTP_PASSWORD,
};
