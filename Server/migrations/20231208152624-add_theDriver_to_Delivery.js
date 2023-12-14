'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Deliveries', 'theDriver', {
      type: Sequelize.BIGINT,
      allowNull: true, // Set to false if the attribute is not nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Deliveries', 'theDriver', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust the allowNull based on your requirements
    });
  },
};
