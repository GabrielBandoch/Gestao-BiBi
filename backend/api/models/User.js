module.exports = {
  tableName: 'Usuario', // botar esaa merda, ver depois
  primaryKey: 'id',     //
  datastore: 'postgreSQL',
  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
    nome: { type: 'string' },
    email: { type: 'string' },
    
    createdAt: {
      type: 'ref', 
      columnType: 'timestamp without time zone',
      autoCreatedAt: true 
    },
    updatedAt: {
      type: 'ref', 
      columnType: 'timestamp without time zone',
      autoUpdatedAt: true 
    },
  },
};

