const nodemailer = require("nodemailer");

const authMailId = process.env.MAIL_ID;
const authMailPassword = process.env.MAIL_PASSWORD;

const mailSender = {
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      prot: 587,
      host: "smtp.gmlail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: authMailId,
        pass: authMailPassword,
      },
    });

    var mailOptions = {
      from: authMailId,
      to: param.email,
      subject: param.subject,
      text: param.text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = { mailSender };
