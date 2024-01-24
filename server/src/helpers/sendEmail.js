const nodemailer = require("nodemailer");
const createError = require("http-errors");
const { SMTP_USERNAME, SMTP_PASSWORD } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

const sendEmail = async (data) => {
  try {
    const mailOptions = {
      from: SMTP_USERNAME, // sender address
      to: data.email, // list of receivers
      subject: data.subject, // Subject line
      text: "Your email will be secure", // plain text body
      html: data.message, // html body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.response);
  } catch (error) {
    console.log("Failed: ", error.message);
    createError(500, error.message);
  }
};

module.exports = sendEmail;
