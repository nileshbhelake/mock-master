const router = require("express").Router();
const {
  userLogin,
  validateToken,
  refreshToken,
} = require("../controllers/auth.controller");

const userType = (type) => {
  return (req, res, next) => {
    req.userType = type;
    next();
  };
};

router.post("/admin-login", userType("admin"), userLogin);
router.post("/student-login", userType("student"), userLogin);
router.post("/validate-token", validateToken);
router.post("/refresh-token", refreshToken);

module.exports = router;
