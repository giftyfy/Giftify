const {sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    product_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_category: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    product_rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    img_url: {
        type: DataTypes.STRING, // Adjust the data type as needed
        allowNull: true, // Set to false if img_url cannot be null
        defaultValue: null, // Set a default value if needed
    },
  });

  return Products;
};