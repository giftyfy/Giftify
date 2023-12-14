'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update existing data in theDriver column
    await queryInterface.sequelize.query(`
      UPDATE "Deliveries"
      SET "theDriver" = CAST("theDriver" AS BIGINT)
      WHERE "theDriver" IS NOT NULL;
    `);

    // Change the data type of theDriver to BIGINT
    await queryInterface.changeColumn('Deliveries', 'theDriver', {
      type: Sequelize.BIGINT,
      allowNull: true, // Set to false if the attribute is not nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Change the data type of theDriver back to STRING
    await queryInterface.changeColumn('Deliveries', 'theDriver', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust the allowNull based on your requirements
    });
  },
};
