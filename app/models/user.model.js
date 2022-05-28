const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: String
  })
);

module.exports = User;
