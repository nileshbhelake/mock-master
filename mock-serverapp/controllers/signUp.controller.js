const { encrypt } = require("../helpers/encryption");
const SignUpModel = require("../models/signUp.model");

const SignUpCtrl = {
  createSignUp(req, res) {
    const signUp = req.body;
    if (signUp.password) signUp.password = encrypt(signUp.password);
    console.log("signUp: ", signUp);
    new SignUpModel(signUp)
      .save()
      .then((result) => {
        res.status(201).send({ message: "signUp Credated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "signUp not Credated...", error: err });
      });
  },

  updateSignUp(req, res) {
    const signUp = req.body;

    const { id } = req?.params;
    if (signUp.password) signUp.password = encrypt(signUp.password);
    SignUpModel.updateOne({ _id: id }, signUp)
      .then((result) => {
        res.status(200).send({ message: "signUp Updated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "signUp Updated...", error: err });
      });
  },

  deleteSignUp(req, res) {
    const { id } = req?.params;
    SignUpModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "signUp deleted...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "signUp not deleted...", error: err });
      });
  },
  fetchOne(req, res) {
    const { id } = req?.params;
    SignUpModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "signUp Recorded...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not found signUp record...", error: err });
      });
  },
  fetchAll(req, res) {
    // const { id } = req?.params;
    SignUpModel.find()
      .then((result) => {
        res.status(200).send({ message: "signUp Recorded...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not found signUp record...", data: err });
      });
  },
};

module.exports = SignUpCtrl;
