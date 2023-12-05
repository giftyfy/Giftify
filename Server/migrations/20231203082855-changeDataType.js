'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change 'Orders' to the name of your table
    await queryInterface.changeColumn('Orders', 'order_price', {
      type: Sequelize.DOUBLE,
      allowNull: true, // or false, depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'order_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true, // or false, depending on your requirements
    });
  },
};
