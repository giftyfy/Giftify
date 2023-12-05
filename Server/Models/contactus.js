const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define('ContactUs', {
    contact_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    f_contactname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_contactname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    contact_message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  return ContactUs;
};