// // models/payment.js

// const { sequelize, DataTypes } = require('sequelize');
// // const {sequelize} = require('../config/config.json'); // Make sure to adjust the path based on your project structure

// const Payment = sequelize.define('Payment', {
//   payment_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   total: {
//     type: DataTypes.DOUBLE, // or DataTypes.DECIMAL
//     allowNull: false,
//   },
//   payment_at: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
// });

// // Define associations
// Payment.belongsTo(User, { foreignKey: 'user_payment_id' });
// Payment.belongsTo(Order, { foreignKey: 'order_payment_id' });

// module.exports = Payment;
// models/Reaction.js
const { boolean } = require('joi');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.json');
// const {Users} = require('./userModel');

module.exports = (sequelize) => {
    const Payments = sequelize.define('Payments', {
        payment_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_payment_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        order_payment_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        total: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        payment_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
      
      // Define associations
    // Payments.belongsTo(sequelize.models.User, { foreignKey: 'user_payment_id' });
    // Payments.belongsTo(sequelize.models.Order, { foreignKey: 'order_payment_id' });
      
      return Payments;
};