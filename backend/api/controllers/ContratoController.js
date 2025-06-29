const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB || 'gestao-relatorios';

module.exports = {
  listar: async function (req, res) {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);

      const { responsavelId, status } = req.query;
      const query = {};
      if (responsavelId) query.responsavelId = responsavelId;
      if (status) query.status = status;

      const contratos = await db.collection('contratos')
        .find(query)
        .sort({ dataCriacao: -1 })
        .toArray();

      client.close();
      return res.json(contratos);
    } catch (err) {
      console.error("Erro ao buscar contratos:", err);
      return res.serverError("Erro ao buscar contratos.");
    }
  }
};
