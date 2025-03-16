// create-responsaveis.js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Responsaveis', {
      idResp: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contratoDigitalizado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idPgto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idAluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Responsaveis');
  },
};
