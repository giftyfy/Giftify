const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config.json');
const { Users } = require('./userModel');
module.exports = (sequelize) => {
const Driver = sequelize.define('Driver', {
  driver_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  driverLicense: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  card_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  driver_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id',
    },
  },
});

Driver.associate = (models) => {
    Driver.belongsTo(models.Users, {
        foreignKey: 'driver_user_id',
        as : 'driver',
        onDelete: 'CASCADE',
    });
};

    return Driver;

};
