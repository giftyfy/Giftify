'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'is_delivered', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'is_delivered');
  },
};
