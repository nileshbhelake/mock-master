const router = require("express").Router();
const { userLogin } = require("../controllers/auth.controller");
const {
  createLogin,
  updateLogin,
  deleteLogin,
  fetchAll,
  fetchOne,
} = require("../controllers/Login.controller");

router.post("/", createLogin, userLogin);
router.put("/:id", updateLogin);
router.delete("/:id", deleteLogin);
router.get("/:id", fetchOne);
router.get("/", fetchAll);

module.exports = router;
