'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'user_image', {
      type: Sequelize.STRING, // Adjust the data type according to your needs
      allowNull: true, // or false, depending on whether the column should allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'user_image');
  },
};
