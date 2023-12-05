'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Orders', {
      fields: ['order_for'],
      type: 'foreign key',
      name: 'fk_order_for_recipient', // Choose a name for your foreign key constraint
      references: {
        table: 'Recipients',
        field: 'recipient_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Orders', 'fk_order_for_recipient');
  },
};
