const authRouter = require("express").Router();
const controllerUser = require("../controller/user");

authRouter.post("/register", controllerUser.register);
authRouter.post("/login", controllerUser.login);
authRouter.post("/refresh-token", controllerUser.refreshToken);

module.exports = {
    authRouter
}