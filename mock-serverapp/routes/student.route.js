const router = require("express").Router();

const {
  createStudent,
  updateStudent,
  deleteStudent,
  fetchAll,
  fetchOne,
} = require("../controllers/student.controller");

router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:id", fetchOne);
router.get("/", fetchAll);

module.exports = router;
