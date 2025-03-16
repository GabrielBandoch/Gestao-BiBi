// create-aluno.js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alunos', {
      idAluno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dtNasc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hrEstudo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idEscola: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Escolas',
          key: 'idEscola',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      idResp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Responsaveis',
          key: 'idResp',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('Alunos');
  },
};
