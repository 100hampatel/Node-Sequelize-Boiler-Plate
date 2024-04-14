const Joi = require("joi");
const helper = require("../helpers/helper");


module.exports = {
    async signInValidation(req) {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8)
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async changePasswordValidation(req) {
        const schema = Joi.object({
            oldPassword:Joi.string().required(),
            password: Joi.string().required()
        }).unknown(true);
        const { error } = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
};
