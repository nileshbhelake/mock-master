const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    firstName: { type: String, minlength: 2, maxlength: 45 },
    lastName: { type: String, minlength: 2, maxlength: 45 },
  },
  phone: { type: String, unique: true, match: /^[0-9]{10}$/ },
  email: { type: String, unique: true, minlength: 5, maxlength: 100 },
  password: String,
  role: String,
  status: { type: Number, min: 0, max: 10 },
});

userSchema.plugin(autoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User1", userSchema);
