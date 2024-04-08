const middlewareController = require("../Controllers/middlewareController");
const userController = require("../Controllers/userController");

const userRouter = require("express").Router();

userRouter.get(
  "/",
  middlewareController.verifyToken,
  userController.getAllUser
);
userRouter.delete(
  "/delete/:id",
  middlewareController.verifyTokenAndAdmin,
  userController.deleteUser
);

module.exports = userRouter;
