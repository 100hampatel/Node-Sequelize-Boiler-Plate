const {Sequelize } = require('sequelize');
const sequelize = require('../connection/connection');
const User = require('./user');
const UserToken = sequelize.define('userToken', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    }
});
UserToken.belongsTo(User, { foreignKey: 'userId' });
module.exports = UserToken;
