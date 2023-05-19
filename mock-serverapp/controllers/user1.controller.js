const User1Model = require("../models/user1.model");
const { encrypt } = require("../helpers/encryption");

const user1Ctrl = {
  createUser(req, res) {
    const user = req.body;
    if (user.password) user.password = encrypt(user.password);
    new User1Model(user)
      .save()
      .then((result) => {
        res.status(201).send({ message: "User Created...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "User not created...", error: err });
      });
  },
  updateUser(req, res) {
    const user = req.body;
    const { id } = req?.params;
    if (user.password) user.password = encrypt(user.password);
    User1Model.updateOne({ _id: id }, user)
      .then((result) => {
        res.status(200).send({ message: "User Updated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "User not updated...", error: err });
      });
  },
  deleteUser(req, res) {
    const { id } = req?.params;
    User1Model.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "User deleted...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "User not deleted...", error: err });
      });
  },
  fetchOne(req, res) {
    const { id } = req?.params;
    User1Model.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "User Record...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "User Record notfound...", error: err });
      });
  },
  fetchAll(req, res) {
    User1Model.find()
      .then((result) => {
        res.status(200).send({ message: "All User Record...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "All User Record not found...", error: err });
      });
  },
};

module.exports = user1Ctrl;
