module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Orders', 'recipient_delivered_seg', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null, // Set a default value
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Orders', 'recipient_delivered_seg');
    },
  };