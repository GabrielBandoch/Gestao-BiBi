// module.exports = {
//   tableName: 'Usuario', // botar esaa merda, ver depois
//   primaryKey: 'id',     //
//   datastore: 'postgreSQL',
//   attributes: {
//     id: {
//       type: 'number',
//       columnType: 'serial',
//       autoIncrement: true,
//     },
//     nome: { type: 'string' },
//     email: { type: 'string' },

//     createdAt: {
//       type: 'ref', 
//       columnType: 'timestamp without time zone',
//       autoCreatedAt: true 
//     },
//     updatedAt: {
//       type: 'ref', 
//       columnType: 'timestamp without time zone',
//       autoUpdatedAt: true 
//     },
//   },
// };

// api/models/Usuario.js
module.exports = {
  tableName: 'usuario',
  primaryKey: 'id',
  datastore: 'postgreSQL', // nome que você definiu no config/datastores.js

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },

    nome: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    senha: {
      type: 'string',
      required: true,
      columnType: 'varchar(255)',
      protect: true // evita retornar no .toJSON()
    },

    cpf: {
      type: 'string',
      required: true,
      unique: true
    },

    celular: {
      type: 'string',
      required: true
    },

    role: {
      type: 'string',
      isIn: ['condutor', 'responsavel'],
      required: true
    },

    foto: {
      type: 'string',
      allowNull: true
    },

    createdAt: {
      type: 'ref',
      columnType: 'timestamp',
      autoCreatedAt: true
    },

    updatedAt: {
      type: 'ref',
      columnType: 'timestamp',
      autoUpdatedAt: true
    }
  },

  beforeCreate: async function (values, proceed) {
    const bcrypt = require('bcrypt');
    try {
      values.senha = await bcrypt.hash(values.senha, 10);
      return proceed();
    } catch (err) {
      return proceed(err);
    }
  },

  customToJSON: function () {
    return _.omit(this, ['senha']);
  }
};
