'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the data type of recipient_seg to TEXT
    await queryInterface.changeColumn('Deliveries', 'recipient_seg', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes if needed
    await queryInterface.changeColumn('Deliveries', 'recipient_seg', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
