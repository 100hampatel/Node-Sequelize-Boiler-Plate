const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const Customer = require('./customer'); // Import the Customer model
const Address = sequelize.define('Address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(124),
        allowNull: false
    },
    landmark: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    pincode: {
        type: Sequelize.STRING(6),
        allowNull: false
    },
    postOfficeName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    district: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
// Address.belongsTo(Customer); // Define the association

module.exports = Address