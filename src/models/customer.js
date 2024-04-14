const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const Address = require('./address'); 
const Customer = sequelize.define('Customer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fullName: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    mobileNumber: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]] 
        }
    }
});

Customer.hasMany(Address, { foreignKey: 'customerId' });
Address.belongsTo(Customer, { foreignKey: 'customerId' });

// Customer.hasMany(Address); // Define the association

module.exports = Customer;