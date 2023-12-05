'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        role_name: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: 'Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};