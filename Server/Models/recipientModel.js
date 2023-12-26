const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Recipient = sequelize.define('Recipient', {
    recipient_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    recipient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_phone_number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipient_location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipient_card_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    card_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recipient_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  });

  return Recipient;
};
