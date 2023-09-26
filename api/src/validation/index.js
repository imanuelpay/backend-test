const ResponseError = require("../error/response");

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false,
        errors: {label: 'key', wrap: {label: false}}
    })
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

module.exports = validate;