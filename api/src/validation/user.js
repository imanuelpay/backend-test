const Joi = require("joi");

const registerUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required()
});

const refreshTokenValidation = Joi.object({
    token: Joi.string().guid().required()
});

const updateUserValidation = Joi.object({
    userId: Joi.number().required(),
    email: Joi.string().email().optional(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional()
})

module.exports = {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation,
    refreshTokenValidation
}