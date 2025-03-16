// create-pagamento.js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pagamentos', {
      idPgto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      dtVenci: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dtPgto: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      stsPgto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reciboEmt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pagamentos');
  },
};
