const router = require("express").Router();

const {
  createContact,
  updateContact,
  deleteContact,
  fetchAll,
  fetchOne,
} = require("../controllers/contactUs.controller");

router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/:id", fetchOne);
router.get("/", fetchAll);

module.exports = router;
