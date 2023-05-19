const StudentModel = require("../models/student.model");
const { encrypt } = require("../helpers/encryption");

const studentCtrl = {
  createStudent(req, res) {
    const student = req.body;
    console.log("Request Received: ", student);

    if (student.password) student.password = encrypt(student.password);
    new StudentModel(student)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Student Created...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Student not created...", error: err });
      });
  },
  updateStudent(req, res) {
    const student = req.body;
    const { id } = req?.params;
    if (student.password) student.password = encrypt(student.password);
    StudentModel.updateOne({ _id: id }, student)
      .then((result) => {
        res.status(200).send({ message: "Student Updated...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Student not updated...", error: err });
      });
  },
  deleteStudent(req, res) {
    const { id } = req?.params;
    StudentModel.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Student deleted...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Student not deleted...", error: err });
      });
  },
  fetchOne(req, res) {
    const { id } = req?.params;
    StudentModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Student Record...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Student Record notfound...", error: err });
      });
  },
  fetchAll(req, res) {
    StudentModel.find()
      .then((result) => {
        res
          .status(200)
          .send({ message: "All Student Record...", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "All Student Record not found...", error: err });
      });
  },
};

module.exports = studentCtrl;
