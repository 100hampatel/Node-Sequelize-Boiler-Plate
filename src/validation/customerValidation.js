


const Joi = require("joi");
const helper = require("../helpers/helper");


module.exports = {
    async addCustomerValidation(req) {

        const schema = Joi.object({
            fullName: Joi.string().max(32).pattern(/^[^\d]+$/).required(),
            mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            birthDate: Joi.date().iso().required(),
            gender: Joi.number().valid(1, 2).required(),
            addresses: Joi.array().items(
                Joi.object({
                    address: Joi.string().max(124).required(),
                    landmark: Joi.string().max(64),
                    pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required()
                })
            ).required()
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async editCustomerValidation(req) {
        const schema = Joi.object({
            customerId: Joi.number().required(),
            fullName: Joi.string().required(),
            mobileNumber: Joi.string().required(),
            birthDate: Joi.date().required(),
            gender: Joi.number().valid(1, 2).required(),
            addresses: Joi.array().items(Joi.object({
                id: Joi.number().optional(),
                address: Joi.string().required(),
                landmark: Joi.string().optional(),
                pincode: Joi.string().required(),
                postOfficeName: Joi.string().optional(),
                district: Joi.string().optional(),
                state: Joi.string().optional(),
                country: Joi.string().optional()
            })).required()
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async getCustomerValidation(req) {
        const schema = Joi.object({
            id: Joi.number().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    
};

