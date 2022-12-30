const nodemailer = require("nodemailer");
const { logger } = require("../utils");

const authMailId = process.env.MAIL_ID;
const authMailPassword = process.env.MAIL_PASSWORD;
const mailSender = {
  sendGmail: function (param) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      host: "smtp.gmail.com",
      secure: true,
      requireTLS: true,
      auth: {
        user: authMailId,
        pass: authMailPassword,
      },
    });

    const mailOptions = {
      from: authMailId,
      to: param.email,
      subject: param.subject,
      text: param.text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error);
      } else {
        logger.info("Email sent: " + info.response);
      }
    });
  },
};

module.exports = { mailSender };
