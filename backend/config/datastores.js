module.exports.datastores = {

  // PostgreSQL (padrão)
  postgreSQL: {
    adapter: 'sails-postgresql',
    url: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
  },

  // // MongoDB
  mongo: {
    adapter: 'sails-mongo',
    url:'mongodb://localhost:27017/bib_mogo'
  }

};

