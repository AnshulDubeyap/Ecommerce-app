//! Step-1, Create a model User.js

const mongoose = require("mongoose");

//! Step-1-1, Create a Schema
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user", //! Default role is 'user'
  },
});

//! Step-1-2, Export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;
