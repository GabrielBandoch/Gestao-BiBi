const PdfService = require('../../services/PdfService');
const EmailService = require('../../services/EmailService');
const MongoService = require('../../services/MongoService');

module.exports = {
  assinar: async function (req, res) {
    try {
      const { nomeMotorista, conteudo } = req.body;
      const { pdfBuffer, hash } = await PdfService.gerarPdf(nomeMotorista, conteudo);

      const mongoId = await MongoService.salvarPdf(pdfBuffer, `relatorio-${Date.now()}.pdf`);
      // await EmailService.enviar({
      //   to: 'responsavel@email.com',
      //   subject: 'Novo Relatório Assinado',
      //   text: `Relatório assinado por ${nomeMotorista}. Hash: ${hash}`,
      //   buffer: pdfBuffer,
      //   filename: 'relatorio.pdf'
      // });

      return res.json({ mensagem: 'PDF assinado e enviado!', hash, mongoId });
    } catch (error) {
      console.error(error);
      return res.serverError('Erro ao processar o relatório.');
    }
  },

  verificarAssinatura: async function (req, res) {
    try {
      const { mongoId, assinaturaResponsavel } = req.body;
      const bufferOriginal = await MongoService.buscarPdf(mongoId);

      const { valido, hash } = await PdfService.validarPdf(bufferOriginal);
      if (!valido) {
        return res.status(400).json({ mensagem: 'Assinatura do motorista inválida.' });
      }

      const bufferAssinado = await PdfService.assinarPorResponsavel(bufferOriginal, assinaturaResponsavel);
      const novoId = await MongoService.salvarPdf(bufferAssinado, `relatorio-assinado-${Date.now()}.pdf`);

      return res.json({ mensagem: 'Assinatura do responsável adicionada!', novoId, hash });
    } catch (err) {
      console.error(err);
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
      console.error(err);
      return res.serverError('Erro ao baixar PDF.');
    }
  }

};
