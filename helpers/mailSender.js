const nodemailer = require("nodemailer");
const mailtemplate = require("../helpers/mailGenerator");

module.exports = (recipients, subject) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "eliftech2012@gmail.com",
        pass: "eliftech20120"
      }
    });

    let mailOptions = {
      from: '"ElifTech Market 👻 "',
      bcc: recipients.join(),
      subject: subject,
      text: `Hello, world`,
      html: mailtemplate
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  });
};
