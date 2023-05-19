const ContactUsModel = require("../models/contactUs.model");

const QuestionCtrl = {
  createContact(req, res) {
    const contact = req.body;
    console.log("contact: ", contact);
    new ContactUsModel(contact)
      .save()
      .then((result) => {
        res.status(201).send({ message: "contact Credated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "contact not Credated...", error: err });
      });
  },

  updateContact(req, res) {
    const contact = req.body;

    const { id } = req?.params;
    ContactUsModel.updateOne({ _id: id }, contact)
      .then((result) => {
        res.status(200).send({ message: "contact Updated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "contact Updated...", error: err });
      });
  },

  deleteContact(req, res) {
    const { id } = req?.params;
    ContactUsModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "contact deleted...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "contact not deleted...", error: err });
      });
  },
  fetchOne(req, res) {
    const { id } = req?.params;
    ContactUsModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "contact Recorded...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not found contact record...", error: err });
      });
  },
  fetchAll(req, res) {
    // const { id } = req?.params;
    ContactUsModel.find()
      .then((result) => {
        res.status(200).send({ message: "contact Recorded...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not found contact record...", data: err });
      });
  },
};

module.exports = QuestionCtrl;
