const authController = require("../Controllers/authController");
const middlewareController = require("../Controllers/middlewareController");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.logoutUser
);

module.exports = router;
