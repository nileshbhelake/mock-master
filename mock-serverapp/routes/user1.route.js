const router = require("express").Router();
const authorize = require("../helpers/middlewares/authorize");
const {
  createUser,
  updateUser,
  deleteUser,
  fetchOne,
  fetchAll,
} = require("../controllers/user1.controller");

router.post("/", authorize(["superadmin", "admin"]), createUser);
router.put("/:id", authorize(["superadmin", "admin"]), updateUser);
router.delete("/:id", authorize(["superadmin", "admin"]), deleteUser);
router.get("/:id", authorize(["superadmin", "admin"]), fetchOne);
router.get("/", authorize(["superadmin", "admin"]), fetchAll);

module.exports = router;
