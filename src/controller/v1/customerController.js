const customerModel = require('../../models/customer');
const addressModel = require('../../models/address')

const responseHelper = require("../../helpers/responseHelper");
const helper = require("../../helpers/helper");
const {
    ACTIVE_STATUS,
    JWT_AUTH_TOKEN_SECRET, JWT_EXPIRES_IN,
    META_STATUS_1, META_STATUS_0,
    SUCCESS, FAILURE,
    SERVERERROR, DELETED_STATUS,
} = require("../../../config/key");
const logger = require("../../helpers/loggerService")
const {Op} = require("sequelize");
const moment = require("moment")
const userValidation = require("../../validation/userValidation")
const userTransformer = require("../../transformers/userTransformer")
const {userDetails} = require("../../services/userService");
const customerValidation = require('../../validation/customerValidation');
const axios = require('axios');
const sequelize = require('../../connection/connection');
const { log } = require('winston');

async function fetchPinCodeDetails(pincode) {
    try {
        const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching pin code details:', error.message);
        throw error; 
    }
}


module.exports.addCustomer = async (req, res) => {
    try {
        
        const reqParam = req.body;
        const userId = req.user.id;
        let validationMessage = await customerValidation.addCustomerValidation(reqParam);
        if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);
        transaction = await sequelize.transaction();
        const { fullName, mobileNumber, birthDate, gender, addresses } = req.body;
        let customer;
        let addres;
        await Promise.all(addresses.map(async address => {
            const pinCodeResponse = await fetchPinCodeDetails(address.pincode);
            if(pinCodeResponse && pinCodeResponse[0].Status !='Error'){
                customer = await customerModel.create({ userId,fullName, mobileNumber, birthDate, gender });

                const addressData = await addressModel.create({
                    customerId: customer.id,
                    address: address.address,
                    landmark: address.landmark,
                    pincode: address.pincode,
                    postOfficeName: pinCodeResponse[0].PostOffice[0].Name,
                    district: pinCodeResponse[0].PostOffice[0].District,
                    state: pinCodeResponse[0].PostOffice[0].State,
                    country: pinCodeResponse[0].PostOffice[0].Country
                });
                if (!customer.addresses) {
                    customer.addresses = [];
                }
                customer.setDataValue('addresses', addressData);

            }else{
                return responseHelper.successapi(res, res.__("pincodenotvalid"), META_STATUS_0, SUCCESS);
            }
           
        }));
        let response = customer;
        return responseHelper.successapi(res, res.__("customeraddsuccefully"), META_STATUS_1, SUCCESS, response);
    } catch (e) {
        console.log(e)
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("somethingWentWrongPleaseTryAgain"), SERVERERROR);
    }
};


module.exports.getCustomer = async (req, res) => {
    try {
        let reqParam = req.body;
        const userId = req.user.id;
        const customerId = reqParam.id;
        let validationMessage = await customerValidation.getCustomerValidation(reqParam);
        if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);
        const customer = await customerModel.findOne({  where: { id: customerId }, include: addressModel});
          
        if (!customer) {
            return responseHelper.successapi(res, res.__("customernotfound"), META_STATUS_0, SUCCESS);
        }
        return responseHelper.successapi(res, res.__("customergetsuccefully"), META_STATUS_1, SUCCESS, customer);
    } catch (e) {
        console.log(e)
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("somethingWentWrongPleaseTryAgain"), SERVERERROR);
    }
};
module.exports.editCustomer = async (req, res) => {
    try {
        let reqParam = req.body;
        const userId = req.user.id;

        let validationMessage = await customerValidation.editCustomerValidation(reqParam);
        if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);
        const { customerId, fullName, mobileNumber, birthDate, gender, addresses } = req.body;

        const customer = await customerModel.findByPk(customerId);
        if (!customer) {
            return responseHelper.successapi(res, res.__("customernotfound"), META_STATUS_0, SUCCESS);
        }
        customer.fullName = fullName;
        customer.mobileNumber = mobileNumber;
        customer.birthDate = birthDate;
        customer.gender = gender;
        await customer.save();
        await Promise.all(addresses.map(async addressData => {
            if (addressData.id) {
                const existingAddress = await addressModel.findByPk(addressData.id);
                if (existingAddress) {
                    Object.assign(existingAddress, addressData);
                    await existingAddress.save();
                }
            } else {
                await addressModel.create({ ...addressData, customerId });
            }
        }));
        const customerAddress = await addressModel.findAll({  where: { customerId: customerId }});
        customer.setDataValue('addresses', customerAddress);
        let response = customer;
        return responseHelper.successapi(res, res.__("customerupdatedsuccefully"), META_STATUS_1, SUCCESS, response);
    } catch (e) {
        console.log(e)
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("somethingWentWrongPleaseTryAgain"), SERVERERROR);
    }
};