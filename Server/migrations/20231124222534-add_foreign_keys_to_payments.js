'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key relationship for user_payment_id
    await queryInterface.addConstraint('Payments', {
      fields: ['user_payment_id'],
      type: 'foreign key',
      name: 'fk_payment_id_user',
      references: {
        table: 'Users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Add foreign key relationship for order_payment_id
    await queryInterface.addConstraint('Payments', {
      fields: ['order_payment_id'],
      type: 'foreign key',
      name: 'fk_payment_id_order',
      references: {
        table: 'Orders',
        field: 'order_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

//   down: async (queryInterface, Sequelize) => {
//     // Remove foreign key relationship for user_payment_id
//     await queryInterface.removeConstraint('Payments', 'fk_user_payment_id_user');

//     // Remove foreign key relationship for order_payment_id
//     await queryInterface.removeConstraint('Payments', 'fk_order_payment_id_order');
//   },
};
