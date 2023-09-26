const userService = require("../service/user");

const register = async (req, res, next) => {
    try {
        await userService.register(req.body);
        res.status(201).json({
            message: "user registered successfully"
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({
            message: e.message
        });
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            payload: result
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({
            message: e.message
        });
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const result = await userService.refreshToken(req.body);
        res.status(200).json({
            payload: result
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({
            message: e.message
        });
    }
}

const getProfile = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const result = await userService.getProfile(userId);
        res.status(200).json({
            payload: result
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({
            message: e.message
        });
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const request = req.body;
        request.userId = userId;

        await userService.updateProfile(request);
        res.status(200).json({
            message: "profile updated successfully",
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({
            message: e.message
        });
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    getProfile,
    updateProfile
}