const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'gestao-relatorios';

module.exports = {
  salvarPdf: async (buffer, filename) => {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(filename);
      uploadStream.end(buffer);
      uploadStream.on('finish', () => {
        client.close();
        resolve(uploadStream.id.toHexString());
      });
      uploadStream.on('error', err => {
        client.close();
        reject(err);
      });
    });
  },

  buscarPdf: async (id) => {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    const downloadStream = bucket.openDownloadStream(new ObjectId(id));
    const chunks = [];

    return new Promise((resolve, reject) => {
      downloadStream.on('data', chunk => chunks.push(chunk));
      downloadStream.on('end', () => {
        client.close();
        resolve(Buffer.concat(chunks));
      });
      downloadStream.on('error', err => {
        client.close();
        reject(err);
      });
    });
  }
};