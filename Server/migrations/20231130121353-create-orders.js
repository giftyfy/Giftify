// migration for Order
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Orders', {
        order_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // Other Order model attributes
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('Orders');
    },
  };
  