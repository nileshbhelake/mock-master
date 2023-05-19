const mongoose = require("mongoose");
// The code starts by requiring the mongoose library.
// This is a JavaScript library that allows for MongoDB queries to be made in Node.js

const contactUsSchema = new mongoose.Schema({
  // The next line creates a new schema called contactUsSchema that has fields: name,
  //     email,phone,subject,message.

  firstName: { type: String, minlength: 2, maxlength: 45 },
  lastName: { type: String, minlength: 2, maxlength: 45 },

  email: { type: String, unique: true, minlength: 5, maxlength: 100 },
  phone: { type: Number, unique: true, match: /^[0-9]{10}$/ },
  subject: String,
  message: String,
});

const ContactUS = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUS;
