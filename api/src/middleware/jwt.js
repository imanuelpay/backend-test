const jwt = require("jsonwebtoken");
const configJWT = require("../config/jwt");

const {TokenExpiredError} = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).json({message: "unauthorized, access token was expired"});
    }

    return res.status(401).json({message: "unauthorized"});
}

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization || "";
    if (!token) {
        return res.status(403).json({message: "no token provided"});
    }

    token = token.replace(/Bearer\s*/, "");
    jwt.verify(token, configJWT.secret, (err, data) => {
        if (err) {
            return catchError(err, res);
        }

        req.auth = data;
        next();
    });
};

module.exports = {
    verifyToken
};