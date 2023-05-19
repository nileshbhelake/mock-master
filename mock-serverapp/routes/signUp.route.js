const router = require("express").Router();

const {
  createSignUp,
  updateSignUp,
  deleteSignUp,
  fetchAll,
  fetchOne,
} = require("../controllers/signUp.controller");

router.post("/", createSignUp);
router.put("/:id", updateSignUp);
router.delete("/:id", deleteSignUp);
router.get("/:id", fetchOne);
router.get("/", fetchAll);

module.exports = router;
