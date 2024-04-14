const userModel = require('../../models/user');
const userTokenModel = require('../../models/userToken')

const bcrypt = require("bcrypt");
const responseHelper = require("../../helpers/responseHelper");
const helper = require("../../helpers/helper");
const {
    ACTIVE_STATUS,
    JWT_AUTH_TOKEN_SECRET, JWT_EXPIRES_IN,
    META_STATUS_1, META_STATUS_0,
    SUCCESS, FAILURE,
    SERVERERROR, DELETED_STATUS,
} = require("../../../config/key");
const jwt = require("jsonwebtoken");
const logger = require("../../helpers/loggerService")
const {Op} = require("sequelize");
const moment = require("moment")
const userValidation = require("../../validation/userValidation")
const userTransformer = require("../../transformers/userTransformer")
const ejs = require("ejs");
const {userDetails} = require("../../services/userService");


module.exports.logIn = async (req, res) => {
    try {
        const reqParam = req.body;
        let validationMessage = await userValidation.signInValidation(reqParam);
        if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);

        reqParam.email = reqParam.email.toLowerCase()

        let existingUser = await userModel.findOne({
            where: {
                email: reqParam.email,
                status: {[Op.ne]: DELETED_STATUS}
            }
        });

        if (!existingUser) return responseHelper.successapi(res, res.__("accountDoesNotExist"), META_STATUS_0, SUCCESS)

        const validPassword = await bcrypt.compare(reqParam.password, existingUser.password);
        if (!validPassword) return responseHelper.error(res, res.__("emailOrPasswordWrong"), FAILURE);

        const tokenData = {
            userId: existingUser.id,
            email: existingUser.email,
            status: existingUser.status,
            createdAt: existingUser.createdAt,
        };

        const response = userTransformer.userViewTransformer(existingUser);
        console.log('JWT_EXPIRES_IN--',JWT_EXPIRES_IN)
        const token = await jwt.sign({tokenData}, JWT_AUTH_TOKEN_SECRET, {expiresIn: JWT_EXPIRES_IN});
        
        const userToken = new userTokenModel()
        userToken.userId = existingUser.id
        userToken.token = token
        await userToken.save()
        return responseHelper.successapi(res, res.__("userLoggedInSuccessfully"), META_STATUS_1, SUCCESS, response, {
            token
        });
    } catch (e) {
        console.log(e)
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("somethingWentWrongPleaseTryAgain"), SERVERERROR);
    }
};


module.exports.changePassword = async (req, res) => {
    try {
        let reqParam = req.body;
        const userId = req.user.id;
        let userExist = await userModel.findOne({where: {id: userId, status: ACTIVE_STATUS}});
        if (!userExist) return responseHelper.successapi(res, res.__("userNotFound"), META_STATUS_0, SUCCESS);

        let passwordValidation = await userValidation.changePasswordValidation(reqParam);
        if (passwordValidation) return responseHelper.error(res, res.__(passwordValidation), FAILURE);

        let isMatch = await bcrypt.compareSync(reqParam.oldPassword, userExist.password);
        if (!isMatch) return responseHelper.successapi(res, res.__("oldPasswordDoesNotMatch"), META_STATUS_0, SUCCESS);

        if (reqParam.oldPassword === reqParam.password) return responseHelper.successapi(res, res.__("oldPasswordAndNewPasswordCanNotBeSame"), META_STATUS_0, SUCCESS);
        let newPassword = await bcrypt.hash(reqParam.password, 10);
        const tokenData = {
            userId: userExist.id,
            email: userExist.email,
            status: userExist.status,
            createdAt: userExist.createdAt,
        };

        
        await userModel.update({password: newPassword}, {where: {id: userId}});
        await userTokenModel.destroy({where: {userId: userExist.id}});
        const token = await jwt.sign({tokenData}, JWT_AUTH_TOKEN_SECRET, {expiresIn: JWT_EXPIRES_IN});
        const userToken = new userTokenModel()
        userToken.userId = userExist.id
        userToken.token = token
        await userToken.save()
        return responseHelper.successapi(res, res.__("passwordChangedSuccessfully"), META_STATUS_1, SUCCESS, {
            token
        });
    } catch (e) {
        console.log(e)
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("somethingWentWrongPleaseTryAgain"), SERVERERROR);
    }
};


exports.logOut = async (req, res) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '');

        if (token) {
            await userTokenModel.destroy({where: {token: token}});
        }
        return responseHelper.successapi(res, res.__("userLogoutSuccessfully"), META_STATUS_1, SUCCESS);
    } catch (e)
    {
        console.log(e)
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("somethingWentWrongPleaseTryAgain"), SERVERERROR);
    }
};

