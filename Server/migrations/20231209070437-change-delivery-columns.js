'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the data type of delivery_from and order_delivery to TEXT
    await queryInterface.changeColumn('Deliveries', 'delivery_from', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn('Deliveries', 'order_delivery', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes if needed
    await queryInterface.changeColumn('Deliveries', 'delivery_from', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });

    await queryInterface.changeColumn('Deliveries', 'order_delivery', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  },
};
