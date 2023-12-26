'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'user_img', {
      type: Sequelize.STRING, // You can adjust the data type based on your needs
      defaultValue: null, // Adjust the default value as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'user_img');
  },
};