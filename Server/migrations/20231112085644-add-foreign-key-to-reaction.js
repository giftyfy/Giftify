// Example: migrations/YYYYMMDDHHmmss-add-foreign-key-to-reaction.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Reactions', 'user_reaction_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // No need to revert the change since it's just a reference modification
  },
};






