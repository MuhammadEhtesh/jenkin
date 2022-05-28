const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require('../config/nodemailer.config')
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  const token = jwt.sign({ email: req.body.email }, config.secret)

  console.log(token);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: token
  });

  user.save((err, usr) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: err });
      return;
    }

    console.log(usr)

    nodemailer.sendConfirmationEmail(
      usr.username,
      usr.email,
      usr.confirmationCode
    );

  });
};

exports.verifyUser = (req, res, next) => {

  console.log(req.params)
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {

      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        console.log(err);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        return res.send({
          message: "Great."
        })
      });
    })
    .catch((e) => console.log("error", e));
};