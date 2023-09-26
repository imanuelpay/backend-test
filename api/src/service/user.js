const validate = require("../validation");
const {
    loginUserValidation,
    registerUserValidation,
    updateUserValidation,
    refreshTokenValidation
} = require("../validation/user");
const ResponseError = require("../error/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configJWT = require("../config/jwt");
const {user: User, refreshToken: RefreshToken} = require("../model");

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await User.count({
        where: {
            email: user.email
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "email already exists");
    }

    user.password = await bcrypt.hashSync(user.password, 10);
    return User.create(user);
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await User.findOne({
        where: {
            email: loginRequest.email
        }
    });

    if (!user) {
        throw new ResponseError(401, "username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "username or password wrong");
    }

    const token = jwt.sign({userId: user.id, email: user.email}, configJWT.secret, {
        expiresIn: configJWT.jwtExpiration
    });

    let refreshToken = await RefreshToken.createToken(user);

    return {
        accessToken: token,
        refreshToken: refreshToken,
    };
}

const refreshToken = async (request) => {
    const tokenRequest = validate(refreshTokenValidation, request);

    const refreshToken  = await RefreshToken.findOne({
        where: {
            token: tokenRequest.token
        }
    });

    if (!refreshToken) {
        throw new ResponseError(403, "token invalid");
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });

        throw new ResponseError(403, "refresh token was expired");
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({userId: user.id, email: user.email}, configJWT.secret, {
        expiresIn: configJWT.jwtExpiration,
    });

    return {
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
    };
}

const getProfile = async (id) => {
    const user  = await User.findOne({
        where: {
            id: id
        },
        attributes: ['name', 'email']
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const updateProfile = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await User.count({
        where: {
            id: user.userId
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};

    if (user.name) {
        data.name = user.name;
    }

    if (user.email) {
        data.email = user.email;
    }

    if (user.password) {
        data.password = await bcrypt.hashSync(user.password, 10);
    }

    return User.update(user, {
        where: {
            id: user.userId,
        },
    });
}

module.exports = {
    register,
    login,
    refreshToken,
    getProfile,
    updateProfile
}