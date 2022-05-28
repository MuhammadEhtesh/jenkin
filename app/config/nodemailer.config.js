const nodemailer = require('nodemailer');
const config = require('../config/auth.config');

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <a href=http://localhost:3000/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
  }).catch(err => console.log(err));
};