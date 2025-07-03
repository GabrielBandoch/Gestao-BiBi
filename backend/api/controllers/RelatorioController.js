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
    let client;

    try {
      const { contrato, idResponsavel } = req.body;

      if (!contrato) {
        return res.status(400).json({ erro: 'Contrato não fornecido.' });
      }

      if (!req.usuario?.id) {
        return res.status(401).json({ erro: 'Usuário não autenticado.' });
      }

      const { pdfBuffer, hash } = await PdfService.gerarPdf(contrato);
      const mongoPdfId = await MongoService.salvarPdf(pdfBuffer, `relatorio-${Date.now()}.pdf`);

      const contratoId = await salvarContrato({
        responsavelId: idResponsavel,
        motoristaId: req.usuario.id,
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

      const bufferOriginal = await MongoService.buscarPdf(mongoId);
      const { valido, hash } = await PdfService.validarPdf(bufferOriginal);

      if (!valido) {
        return res.status(400).json({ mensagem: 'Assinatura do motorista inválida.' });
      }

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
    let client;

    try {
      const { contrato, idResponsavel } = req.body;

      if (!contrato || !idResponsavel) {
        return res.status(400).json({ erro: 'Contrato e id do responsável são obrigatórios.' });
      }

      if (!req.usuario?.id) {
        return res.status(401).json({ erro: 'Usuário não autenticado.' });
      }

      const idMotorista = req.usuario.id;

      const { pdfBuffer, hash } = await PdfService.gerarPdf(contrato);
      const mongoPdfId = await MongoService.salvarPdf(pdfBuffer, `contrato-${Date.now()}.pdf`);

      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const contratoId = await db.collection('contratos').insertOne({
        responsavelId: idResponsavel,
        motoristaId: idMotorista,
        pdfId: mongoPdfId,
        status: "enviado_para_responsavel",
        dataCriacao: new Date(),
        contrato
      }).then(result => result.insertedId.toHexString());

      const responsavel = await User.findOne({ id: idResponsavel });
      if (!responsavel) {
        return res.status(404).json({ erro: 'Responsável não encontrado.' });
      }

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
    } finally {
      if (client) client.close();
    }
  },

  assinarResponsavel: async function (req, res) {
    let client;
    try {
      const { contratoId, contratoAtualizado } = req.body;

      console.log("🔍 BODY recebido:", req.body);

      if (!contratoId || !contratoAtualizado) {
        return res.status(400).json({ erro: 'ContratoId, nome do responsável e contrato atualizado são obrigatórios.' });
      }

      const assinaturaResponsavel = contratoAtualizado.assinaturaResponsavel;
      if (!assinaturaResponsavel) {
        return res.status(400).json({ erro: 'Assinatura do responsável não informada.' });
      }

      // Monta contrato seguro
      const contratoSafe = {
        nomeCondutor: contratoAtualizado.nomeCondutor || "Não informado",
        contratado: contratoAtualizado.contratado || [],
        assinado: contratoAtualizado.assinado ?? false,
        tipoTrajeto: contratoAtualizado.tipoTrajeto ?? 1,
        formaPagamento: contratoAtualizado.formaPagamento || "A combinar",
        valorTotal: contratoAtualizado.valorTotal || "0,00",
        numeroParcelas: contratoAtualizado.numeroParcelas || "1",
        valorParcela: contratoAtualizado.valorParcela || "0,00",
        dataPagamento: contratoAtualizado.dataPagamento || "A definir",
        data: (contratoAtualizado.data || []).map(d => ({
          dia: d.dia ?? 1,
          mes: d.mes || "Janeiro",
          ano: d.ano ?? 2025
        })),
        Alunos: contratoAtualizado.Alunos || [],
        assinaturaResponsavel // <- salva assinatura separada do nome
      };

      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const contratoDoc = await db.collection('contratos').findOne({ _id: new ObjectId(contratoId) });
      if (!contratoDoc) {
        return res.status(404).json({ erro: 'Contrato não encontrado.' });
      }

      // Valida PDF antigo
      const bufferOriginal = await MongoService.buscarPdf(contratoDoc.pdfId);
      const validacao = await PdfService.validarPdf(bufferOriginal);
      if (!validacao.valido) {
        return res.status(400).json({ mensagem: 'Assinatura do motorista inválida.' });
      }

      // Gera novo PDF com assinatura
      const { pdfBuffer: bufferAssinado, hash: novoHash } = await PdfService.gerarPdf(contratoSafe);
      const novoPdfId = await MongoService.salvarPdf(bufferAssinado, `contrato-assinado-${Date.now()}.pdf`);

      // Atualiza banco
      await db.collection('contratos').updateOne(
        { _id: contratoDoc._id },
        {
          $set: {
            status: "aguardando_assinatura_do_motorista",
            pdfId: novoPdfId,
            dataAssinaturaResponsavel: new Date(),
            contrato: contratoSafe
          }
        }
      );
      const nomeResponsavel = contratoSafe.contratado?.[0]?.nome || "Responsável";

      const motorista = await User.findOne({ where: { id: contratoDoc.motoristaId } });
      if (motorista) {
        await EmailService.enviar({
          to: motorista.email,
          subject: 'Contrato aguardando sua assinatura',
          text: `Olá ${motorista.nome},\n\nO responsável ${nomeResponsavel} assinou o contrato.`,
          buffer: bufferAssinado,
          filename: 'contrato-assinado.pdf'
        });
      }

      return res.json({
        mensagem: 'Contrato assinado pelo responsável com sucesso!',
        novoPdfId,
        hash: novoHash
      });

    } catch (err) {
      console.error('💥 Erro em assinarResponsavel:', err);
      return res.serverError('Erro ao assinar contrato pelo responsável.');
    } finally {
      if (client) await client.close();
    }
  },

  assinarFinalMotorista: async function (req, res) {
    let client;

    try {
      const { contratoId, nomeMotorista } = req.body;

      if (!contratoId || !nomeMotorista) {
        return res.status(400).json({ erro: 'ContratoId e nome do motorista são obrigatórios.' });
      }

      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const contratoDoc = await db.collection('contratos').findOne({ _id: new ObjectId(contratoId) });

      if (!contratoDoc) {
        return res.status(404).json({ erro: 'Contrato não encontrado.' });
      }

      if (contratoDoc.status !== 'aguardando_assinatura_do_motorista') {
        return res.status(400).json({ erro: 'O contrato não está pronto para assinatura final do motorista.' });
      }

      // Monta o contrato final, adicionando o nome do motorista
      const contratoCompleto = {
        ...contratoDoc.contrato,
        nomeMotorista
      };

      // Gera o PDF final com o nome do responsável e do motorista nas linhas certas
      const { pdfBuffer: pdfFinal, hash: hashFinal } = await PdfService.gerarPdf(contratoCompleto);
      const finalPdfId = await MongoService.salvarPdf(pdfFinal, `contrato-final-${Date.now()}.pdf`);

      // Atualiza o documento no Mongo
      await db.collection('contratos').updateOne(
        { _id: contratoDoc._id },
        {
          $set: {
            status: "completo",
            pdfId: finalPdfId,
            dataAssinaturaFinal: new Date(),
            contrato: contratoCompleto
          }
        }
      );

      // Envia o e-mail para o responsável avisando
      const responsavel = await User.findOne({ id: contratoDoc.responsavelId });
      if (responsavel) {
        await EmailService.enviar({
          to: responsavel.email,
          subject: 'Contrato finalizado com sucesso',
          text: `Olá ${responsavel.nome},\n\nO motorista ${nomeMotorista} finalizou o contrato. Ele está agora completo.`,
          buffer: pdfFinal,
          filename: 'contrato-finalizado.pdf'
        });
      }

      return res.json({
        mensagem: 'Contrato assinado e finalizado com sucesso!',
        finalPdfId
      });

    } catch (err) {
      console.error('💥 Erro em assinarFinalMotorista:', err);
      return res.serverError('Erro ao finalizar o contrato.');
    } finally {
      if (client) await client.close();
    }
  },


  listarPendentesMotorista: async function (req, res) {
    try {
      const { motoristaId } = req.query;

      if (!motoristaId) {
        return res.status(400).json({ erro: 'motoristaId é obrigatório.' });
      }

      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      const contratos = await db.collection('contratos')
        .find({ motoristaId, status: 'aguardando_assinatura_do_motorista' })
        .sort({ dataCriacao: -1 })
        .toArray();

      client.close();
      return res.json(contratos);

    } catch (err) {
      console.error('Erro ao listar contratos pendentes do motorista:', err);
      return res.serverError('Erro interno ao listar contratos.');
    }
  }


};
