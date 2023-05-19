const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: Number,
  name: {
    firstName: String,
    lastName: String,
  },
  phone: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: Number,
  },
  dob: Date,
  gender: String,
  qualification: String,
  status: String,
  course: [String],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
