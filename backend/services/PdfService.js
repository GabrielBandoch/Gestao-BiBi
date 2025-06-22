const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const crypto = require('crypto');

module.exports = {
  gerarPdf: async (nomeMotorista, conteudo) => {
    const hash = crypto.createHash('sha256').update(conteudo).digest('hex');
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText('Relatório de Despesas', {
      x: 50,
      y: height - 50,
      size: 16,
      font,
    });

    page.drawText(`Motorista: ${nomeMotorista}`, { x: 50, y: height - 80, size: 12, font });
    page.drawText('Conteúdo:', { x: 50, y: height - 110, size: 12, font });
    page.drawText(conteudo, { x: 50, y: height - 130, size: 12, font });
    page.drawText('Assinatura Digital (SHA-256):', { x: 50, y: height - 180, size: 10, font });
    page.drawText(hash, { x: 50, y: height - 200, size: 10, font });

    // Salva o hash como metadado do PDF
    pdfDoc.setSubject(hash);
    pdfDoc.setTitle(conteudo);

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
    return { pdfBuffer: Buffer.from(pdfBytes), hash };
  },

  validarPdf: async (buffer) => {
    const pdfDoc = await PDFDocument.load(buffer);
    const hashOriginal = pdfDoc.getSubject() || '';
    const conteudo = pdfDoc.getTitle() || '';

    const hashAtual = crypto.createHash('sha256').update(conteudo).digest('hex');
    return { valido: hashOriginal === hashAtual, hash: hashAtual };
  },

  assinarPorResponsavel: async (buffer, assinatura) => {
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    lastPage.drawText('Assinado por responsável:', {
      x: 50,
      y: 100,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    lastPage.drawText(assinatura, {
      x: 50,
      y: 80,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
    return Buffer.from(pdfBytes);
  }
};
