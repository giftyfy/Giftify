const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Wishlist = sequelize.define('Wishlist', {
    wishlist_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_wishlist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    product_wishlist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });

  // Define associations
  Wishlist.belongsTo(sequelize.models.Users, {
    foreignKey: 'user_wishlist_id',
    onDelete: 'CASCADE',
  });

  Wishlist.belongsTo(sequelize.models.Products, {
    foreignKey: 'product_wishlist_id',
    onDelete: 'CASCADE',
  });

  return Wishlist;
};
