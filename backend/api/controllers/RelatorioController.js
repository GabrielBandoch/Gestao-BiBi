const { MongoClient, ObjectId } = require('mongodb');
const PdfService = require('../../services/PdfService');
const MongoService = require('../../services/MongoService');
const EmailService = require('../../services/EmailService');
const User = sails.models.user;

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB || 'gestao-relatorios';

async function salvarContrato(dados) {
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db(dbName);
  const result = await db.collection('contratos').insertOne(dados);
  client.close();
  return result.insertedId.toHexString();
}

module.exports = {
  assinar: async function (req, res) {
    try {
      const { contrato, idResponsavel } = req.body;

      if (!contrato) {
        return res.status(400).json({ erro: 'Contrato não fornecido.' });
      }

      // gera o PDF inicial com a assinatura do motorista
      const { pdfBuffer, hash } = await PdfService.gerarPdf(contrato);
      const mongoPdfId = await MongoService.salvarPdf(pdfBuffer, `relatorio-${Date.now()}.pdf`);

      // salva no Mongo
      const contratoId = await salvarContrato({
        responsavelId: idResponsavel,
        pdfId: mongoPdfId,
        status: "enviado_para_responsavel",
        dataCriacao: new Date(),
        contrato
      });

      return res.json({
        mensagem: 'Contrato assinado pelo motorista e salvo no sistema.',
        hash,
        mongoPdfId,
        contratoId
      });

    } catch (error) {
      console.error('💥 Erro em assinar:', error);
      return res.serverError('Erro ao processar o contrato.');
    }
  },

  verificarAssinatura: async function (req, res) {
    try {
      const { mongoId, assinaturaResponsavel } = req.body;

      if (!mongoId || !assinaturaResponsavel) {
        return res.status(400).json({ erro: 'Dados insuficientes para assinar.' });
      }

      // busca o PDF original salvo pelo motorista
      const bufferOriginal = await MongoService.buscarPdf(mongoId);
      const { valido, hash } = await PdfService.validarPdf(bufferOriginal);

      if (!valido) {
        return res.status(400).json({ mensagem: 'Assinatura do motorista inválida.' });
      }

      // adiciona a assinatura do responsável
      const bufferAssinado = await PdfService.assinarPorResponsavel(bufferOriginal, assinaturaResponsavel);
      const novoPdfId = await MongoService.salvarPdf(bufferAssinado, `relatorio-assinado-${Date.now()}.pdf`);

      return res.json({
        mensagem: 'Assinatura do responsável adicionada com sucesso!',
        novoPdfId,
        hash
      });

    } catch (err) {
      console.error('💥 Erro em verificarAssinatura:', err);
      return res.serverError('Erro ao verificar ou assinar relatório.');
    }
  },

  baixar: async function (req, res) {
    try {
      const { mongoId } = req.params;
      const buffer = await MongoService.buscarPdf(mongoId);

      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', `attachment; filename="relatorio-${mongoId}.pdf"`);
      return res.send(buffer);

    } catch (err) {
      console.error('💥 Erro em baixar:', err);
      return res.serverError('Erro ao baixar PDF.');
    }
  },

  enviarEmail: async function (req, res) {
    try {
      const { contrato, idResponsavel } = req.body;

      if (!contrato || !idResponsavel) {
        return res.status(400).json({ erro: 'Contrato e id do responsável são obrigatórios.' });
      }

      // Gera o PDF
      const { pdfBuffer, hash } = await PdfService.gerarPdf(contrato);

      // Salva PDF no MongoDB
      const mongoPdfId = await MongoService.salvarPdf(pdfBuffer, `contrato-${Date.now()}.pdf`);

      // Salva contrato no MongoDB
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const contratoId = await db.collection('contratos').insertOne({
        responsavelId: idResponsavel,
        pdfId: mongoPdfId,
        status: "enviado_para_responsavel",
        dataCriacao: new Date(),
        contrato
      }).then(result => result.insertedId.toHexString());
      client.close();

      // Busca o e-mail do responsável no relacional
      const responsavel = await User.findOne({ id: idResponsavel });
      if (!responsavel) {
        return res.status(404).json({ erro: 'Responsável não encontrado.' });
      }

      // Envia o e-mail
      await EmailService.enviar({
        to: responsavel.email,
        subject: 'Novo contrato para assinatura',
        text: `Olá ${responsavel.nome},\n\nSegue o contrato gerado pelo motorista ${contrato.nomeCondutor} para sua assinatura.`,
        buffer: pdfBuffer,
        filename: 'contrato.pdf'
      });

      return res.json({
        mensagem: 'E-mail enviado com o contrato em anexo com sucesso!',
        hash,
        mongoPdfId,
        contratoId
      });

    } catch (err) {
      console.error('💥 Erro em enviarEmail:', err);
      return res.serverError('Erro ao enviar o contrato por e-mail.');
    }
  },

  assinarResponsavel: async function (req, res) {
    try {
      const { contratoId, nomeResponsavel } = req.body;

      if (!contratoId || !nomeResponsavel) {
        return res.status(400).json({ erro: 'ContratoId e nome do responsável são obrigatórios.' });
      }

      // Buscar contrato no Mongo
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const contratoDoc = await db.collection('contratos').findOne({ _id: new ObjectId(contratoId) });

      if (!contratoDoc) {
        client.close();
        return res.status(404).json({ erro: 'Contrato não encontrado.' });
      }

      // Buscar PDF original
      const bufferOriginal = await MongoService.buscarPdf(contratoDoc.pdfId);

      // Validar assinatura do motorista
      const { valido, hash } = await PdfService.validarPdf(bufferOriginal);
      if (!valido) {
        client.close();
        return res.status(400).json({ mensagem: 'Assinatura do motorista inválida.' });
      }

      // Assinar PDF pelo responsável
      const bufferAssinado = await PdfService.assinarPorResponsavel(bufferOriginal, nomeResponsavel);
      const novoPdfId = await MongoService.salvarPdf(bufferAssinado, `contrato-assinado-${Date.now()}.pdf`);

      // Atualizar o contrato no Mongo
      await db.collection('contratos').updateOne(
        { _id: contratoDoc._id },
        { $set: { status: "assinado_pelo_responsavel", pdfId: novoPdfId, dataAssinaturaResponsavel: new Date() } }
      );
      client.close();

      return res.json({
        mensagem: 'Contrato assinado pelo responsável com sucesso!',
        novoPdfId,
        hash
      });

    } catch (err) {
      console.error('💥 Erro em assinarResponsavel:', err);
      return res.serverError('Erro ao assinar contrato pelo responsável.');
    }
  }

};
