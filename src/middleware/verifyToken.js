const userModel = require('../models/user');
const userTokenModel = require('../models/userToken')
const responseHelper = require('../helpers/responseHelper');
const jwt = require('jsonwebtoken');
const {
    ACTIVE_STATUS,
    DELETED_STATUS,
    UNAUTHORIZED,
    JWT_AUTH_TOKEN_SECRET
} = require("../../config/key");
const logger = require("../helpers/loggerService");
const {Op} = require("sequelize");

//User Auth
exports.userAuth = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) return responseHelper.error(res, res.__("tokenNotFound"), UNAUTHORIZED);
        const token = req.header('Authorization').replace('Bearer ', '');
        let decode = await jwt.verify(token, JWT_AUTH_TOKEN_SECRET);
        if (!decode) return responseHelper.error(res, res.__("tokenExpired"), UNAUTHORIZED);
        const checkUserToken = await userTokenModel.findOne({
            where: {
                userId: decode.tokenData.userId,
                token:token
            }
        });
        if (!checkUserToken) return responseHelper.error(res, res.__("tokenExpired"), UNAUTHORIZED);
        const user = await userModel.findOne({
            where: {
                id: decode.tokenData.userId,
                status: {[Op.ne]: DELETED_STATUS}
            }
        });
        if (!user) return responseHelper.error(res, res.__("userNotFound"), UNAUTHORIZED);
        req.user = user;

        await next();
    } catch (e) {
        logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__("tokenExpired"), UNAUTHORIZED);
    }
};
