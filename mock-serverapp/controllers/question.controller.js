const QuestionModel = require("../models/question.model");

const QuestionCtrl = {
  createQuestion(req, res) {
    // console.log("Question: ", question);

    QuestionModel.insertMany(req.body)
      .then((result) => {
        res
          .status(200)
          .send({ message: "Question is created...", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Question can not created...", error: err });
      });
  },

  //update Question
  updateQuestion(req, res) {
    const question = req.body;
    const { id } = req.params;
    QuestionModel.updateOne({ _id: id }, question)
      .then((result) => {
        res.status(200).send({ message: "Question updated...", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "Question can not update...", error: err });
      });
  },

  //delete Question
  deleteQuestion(req, res) {
    const question = req.body;
    const { id } = req?.params;
    QuestionModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Question deleted...", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "Question can not delete...", error: err });
      });
  },

  fetchOne(req, res) {
    const { id } = req?.params;
    QuestionModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Question Record...", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Question can not fetched...", error: err });
      });
  },
  fetchAll(req, res) {
    // const { id } = req.params;
    const { status } = req.query;
    let filter = {};
    if (status) {
      const arr = status?.split(",");
      filter.status = { $in: arr };
    }
    QuestionModel.find(filter)
      .then((result) => {
        res.status(200).send({ message: "Question Record...", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Question record can not fetched...", error: err });
      });
  },
};
module.exports = QuestionCtrl;
