var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "vomaksh@zoho.com",
    pass: "-iB9_GL3:m22S.k"
  }
});

module.exports = (toEmails, subject, text, html) => {
  const to = toEmails.join(", ");
  const from = '"VOMAkSh " <vomaksh@zoho.com>';
  var mailOptions = { from, to, subject, text, html };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};
