require("dotenv").config();
let key = (process.env.ENVIRONMENT).toUpperCase();
console.log("key >>>",key);
module.exports = {
    PORT: key == "PRODUCTION" ? process.env.PORT_PROD : key == "DEV" ? process.env.PORT_DEV : process.env.PORT_LOCAL,
    DB_NAME: key == "PRODUCTION" ? process.env.DB_NAME_PROD : key == "DEV" ? process.env.DB_NAME_DEV : process.env.DB_NAME_LOCAL,
    DB_USER: key == "PRODUCTION" ? process.env.DB_USER_PROD : key == "DEV" ? process.env.DB_USER_DEV : process.env.DB_USER_LOCAL,
    DB_PASSWORD: key == "PRODUCTION" ? process.env.DB_PASSWORD_PROD : key == "DEV" ? process.env.DB_PASSWORD_DEV : process.env.DB_PASSWORD_LOCAL,
    DB_HOST: key == "PRODUCTION" ? process.env.DB_HOST_PROD : key == "DEV" ? process.env.DB_HOST_DEV : process.env.DB_HOST_LOCAL,
    DB_DIALECT:process.env.DB_DIALECT,
    DB_POOL_MAX:parseInt(process.env.DB_POOL_MAX),
    DB_POOL_MIN:parseInt(process.env.DB_POOL_MIN),
    DB_POOL_ACQUIRE:process.env.DB_POOL_ACQUIRE,
    DB_POOL_IDLE:process.env.DB_POOL_IDLE,
    JWT_AUTH_TOKEN_SECRET: key == "PRODUCTION" ? process.env.JWT_AUTH_TOKEN_SECRET_PROD : key == "DEV" ? process.env.JWT_AUTH_TOKEN_SECRET_DEV : process.env.JWT_AUTH_TOKEN_SECRET_LOCAL,
    JWT_EXPIRES_IN: key == "PRODUCTION" ? process.env.JWT_EXPIRES_IN_PROD : key == "DEV" ? process.env.JWT_EXPIRES_IN_DEV : process.env.JWT_EXPIRES_IN_LOCAL,
    RESET_TOKEN_EXPIRES: key == "PRODUCTION" ? process.env.RESET_TOKEN_EXPIRES_PROD : key == "DEV" ? process.env.RESET_TOKEN_EXPIRES_DEV : process.env.RESET_TOKEN_EXPIRES_LOCAL,
    PAGINATION_LIMIT: 10,
    SERVERERROR: 500,
    FAILURE : 400,
    UNAUTHORIZED: 401,
    SUCCESS: 200,
    MAINTENANCE: 503,
    ACTIVE_STATUS: 1,
    INACTIVE_STATUS: 2,
    DELETED_STATUS: 3,
    META_STATUS_0: 0,
    META_STATUS_1: 1,
    IS_SSL : process.env.IS_SSL
}
