module.exports = {
    datastore: 'postgreSQL',
    attributes: {
      id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
      nome: { type: 'string' },
      email: { type: 'string' }
    },
  };