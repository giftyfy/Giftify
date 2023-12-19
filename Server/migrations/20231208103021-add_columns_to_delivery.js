'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Deliveries', 'delivery_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.addColumn('Deliveries', 'delivery_for_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Recipients',
        key: 'recipient_id',
      },
    });

    await queryInterface.addColumn('Deliveries', 'recipient_seg', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Deliveries', 'theDriver', {
        type: Sequelize.BIGINT,
        allowNull: false,
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Deliveries', 'delivery_at');
    await queryInterface.removeColumn('Deliveries', 'delivery_for_id');
    await queryInterface.removeColumn('Deliveries', 'recipient_seg');
    await queryInterface.removeColumn('Deliveries', 'theDriver');
  },
};