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
    //   references: {
    //     model: 'Users',
    //     key: 'user_id',
    //   },
    },
    order_delivery: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    delivery_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    delivery_for_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Recipient',
        key: 'recipient_id',
      },
    },
    recipient_seg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    theDriver : {
         type: DataTypes.STRING,
        allowNull: true,
    }
  });

  Delivery.associate = (models) => {
//     Delivery.belongsTo(models.Products, {
//       foreignKey: 'order_delivery',
//       as: 'order', // Alias for the association
//       onDelete: 'CASCADE',
//     });

    // Delivery.belongsTo(models.Users, {
    //   foreignKey: 'delivery_from',
    //   as: 'from', // Alias for the association
    //   onDelete: 'CASCADE',
    // });

    Delivery.belongsTo(models.Recipient, {
        foreignKey: 'delivery_for_id',
        as: 'for',
        onDelete: 'CASCADE',
      });
  };


  return Delivery;
};