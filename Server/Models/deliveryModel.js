const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Delivery = sequelize.define('Delivery', {
    delivery_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    delivery_from: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
    order_delivery: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });

  return Delivery;
};
