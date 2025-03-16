// seed-auth.js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Auth', [
      {
        login: 'admin',
        senha: 'senha123',
        tipoUser: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Auth', null, {});
  },
};
