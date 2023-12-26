'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'user_image', {
      type: Sequelize.TEXT,
      allowNull: true, // or false, depending on whether the column should allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'user_image', {
      type: Sequelize.STRING(255),
      allowNull: true, // or false, depending on whether the column should allow null values
    });
  },
};
