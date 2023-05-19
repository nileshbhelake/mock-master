const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const testSchema = new mongoose.Schema({
  testId: Number,
  subject: String,
  topic: String,

  title: String,
  duration: Number,
  totalMarks: Number,
  passingMarks: Number,
  totalQuestion: Number,
  attendedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
  createdAt: { type: Date, default: Date.now },
  questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Question" }],
});

testSchema.plugin(autoIncrement, { inc_field: "testId" });
module.exports = mongoose.model("Test", testSchema);
