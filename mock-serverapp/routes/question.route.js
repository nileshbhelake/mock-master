const router = require("express").Router();
const authorize = require("../helpers/middlewares/authorize");

const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  fetchAll,
  fetchOne,
} = require("../controllers/question.controller");

router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.get("/:id", fetchOne);
router.get("/", fetchAll);

module.exports = router;
