const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

async function sendMail(data, recipient, recipientName, html) {
  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bloodnetworkapp@gmail.com", //mail used to send mail
        pass: "147@BloodNetwork", // pw for mail
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Blood Network" <bloodNetwork@gmail.com>', // sender address
      to: recipient, // list of receivers
      subject: "Password Reset Mail", // Subject line
      text: "Password Reset Token", // plain text body
      //html: data,
      html: await (
        await readFile("../server/views/email/forgotPassword.html", "utf8")
      ).replace("___token___", data),
      //     .replace("___name___", recipientName), // html body
    });
    return Promise.resolve("Mail sent");
  } catch (ex) {
    return Promise.reject(ex);
  }
  //console.log("message sent");
}

module.exports = sendMail;
