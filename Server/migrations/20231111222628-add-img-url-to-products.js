'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'img_url', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 'img_url');
  },
};
