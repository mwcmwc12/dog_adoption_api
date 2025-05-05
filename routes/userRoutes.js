const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

// Post to "/user/register" to register a new user
userRouter.post("/register", userController.userRegister);

// Get to "/user/login" to authenticate and login an user
userRouter.get("/login", userController.userLogin);

module.exports = userRouter;