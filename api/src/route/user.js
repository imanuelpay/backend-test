const userRouter = require("express").Router();
const authJwt = require("../middleware/jwt");
const controllerUser = require("../controller/user");

userRouter.get("/profile", [authJwt.verifyToken], controllerUser.getProfile);
userRouter.put("/profile", [authJwt.verifyToken], controllerUser.updateProfile)

module.exports = {
    userRouter
}