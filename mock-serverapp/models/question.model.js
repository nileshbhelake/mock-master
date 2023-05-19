const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const questionSchema = new mongoose.Schema({
  qId: Number,
  title: String,
  exam: String,
  subject: String,
  topic: String,

  answer: [
    {
      aId: Number,
      title: String,
      correct: Boolean,
    },
  ],
  status: Number,
});
questionSchema.plugin(AutoIncrement, { inc_field: "qId" });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
