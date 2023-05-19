const router = require("express").Router();
const authorize = require("../helpers/middlewares/authorize");

const {
  createTest,
  updateTest,
  deleteTest,
  fetchAll,
  fetchOne,
} = require("../controllers/test.controller");

router.post("/", authorize(["superadmin", "admin"]), createTest);
router.put("/:id", authorize(["superadmin", "admin"]), updateTest);
router.delete("/:id", authorize(["superadmin", "admin"]), deleteTest);
router.get("/:id", authorize(["superadmin", "admin"]), fetchOne);
router.get("/", authorize(["superadmin", "admin"]), fetchAll);

module.exports = router;
