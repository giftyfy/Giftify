const { boolean } = require('joi');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.json');
// const {Users} = require('./userModel');
module.exports = (sequelize) => {
  const Reaction = sequelize.define('Reaction', {
    reaction_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    product_reaction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    reaction_at: {
      type: DataTypes.DATE,
    //   defaultValue: DataTypes.fn('now'),
    },
    user_reaction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // is_deleted : {
    //     type : boolean,
    //     defaultValue: false,
    // }
  });

  // Define associations
  Reaction.belongsTo(sequelize.models.Products, {
    foreignKey: 'product_reaction_id',
    onDelete: 'CASCADE',
  });

  return Reaction;
};