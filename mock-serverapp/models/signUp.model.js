const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  email: String,
  password: String,
  confirmPassword: String,
});

const Signup = mongoose.model("Signup", signUpSchema);

module.exports = Signup;
