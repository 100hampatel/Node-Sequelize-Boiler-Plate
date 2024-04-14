const {Sequelize} = require('sequelize');
const {DB_NAME,DB_USER,DB_PASSWORD,DB_HOST,DB_DIALECT,DB_POOL_MAX,DB_POOL_MIN,DB_POOL_ACQUIRE,DB_POOL_IDLE} = require("../../config/key");


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    operatorsAliases: false,
  
    pool: {
      max: DB_POOL_MAX,
      min: DB_POOL_MIN,
      acquire: DB_POOL_ACQUIRE,
      idle:DB_POOL_IDLE
    }
  });

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected.!`)
}).catch((err) => {
    console.log('DB_POOL_MIN',err)
})

sequelize.sync({ alter: false });

//exporting the module
module.exports = sequelize
