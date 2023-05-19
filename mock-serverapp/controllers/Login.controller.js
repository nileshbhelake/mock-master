const LoginModel = require("../models/login.model");
const { encrypt } = require("../helpers/encryption");

const LoginCtrl = {
  createLogin(req, res) {
    const login = req.body;
    if (login.password) login.password = encrypt(login.password);
    console.log("Login: ", login);
    new LoginModel(login)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Login Credated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Login not Credated...", error: err });
      });
  },

  updateLogin(req, res) {
    const login = req.body;

    const { id } = req?.params;
    if (login.password) login.password = encrypt(login.password);
    LoginModel.updateOne({ _id: id }, login)
      .then((result) => {
        res.status(200).send({ message: "Login Updated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Login Updated...", error: err });
      });
  },

  deleteLogin(req, res) {
    const { id } = req?.params;
    LoginModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Login deleted...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Login not deleted...", error: err });
      });
  },
  fetchOne(req, res) {
    const { id } = req?.params;
    LoginModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Login Recorded...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not found Login record...", error: err });
      });
  },
  fetchAll(req, res) {
    // const { id } = req?.params;
    LoginModel.find()
      .then((result) => {
        res.status(200).send({ message: "Login Recorded...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not found Login record...", data: err });
      });
  },
};

module.exports = LoginCtrl;
