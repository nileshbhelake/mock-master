const TestModel = require("../models/test.model");

const TestCtrl = {
  createTest(req, res) {
    // console.log("Test: ", test);

    TestModel.insertMany(req.body)
      .then((result) => {
        res.status(200).send({ message: "Test is created...", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Test can not created...", error: err });
      });
  },

  //update Test
  updateTest(req, res) {
    const test = req.body;
    const { id } = req.params;
    TestModel.updateOne({ _id: id }, test)
      .then((result) => {
        res.status(200).send({ message: "Test updated...", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Test can not update...", error: err });
      });
  },

  //delete Test
  deleteTest(req, res) {
    const test = req.body;
    const { id } = req?.params;
    TestModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Test deleted...", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Test can not delete...", error: err });
      });
  },

  fetchOne(req, res) {
    const { id } = req?.params;
    TestModel.findOne({ _id: id })
      .populate("attendedBy")
      .populate("questions")
      .then((result) => {
        res.status(200).send({ message: "Test Record...", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Test can not fetched...", error: err });
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
    TestModel.find(filter)
      .populate("attendedBy")
      .populate("questions")
      .then((result) => {
        res.status(200).send({ message: "Test Record...", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Test record can not fetched...", error: err });
      });
  },
};
module.exports = TestCtrl;
