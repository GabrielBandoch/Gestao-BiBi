const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const crypto = require('crypto');

module.exports = {
  gerarPdf: async (contrato) => {
    if (!contrato) throw new Error("Contrato não fornecido ao gerarPdf");

    // Monta o texto base para hash
    const conteudo = JSON.stringify(contrato);
    const hash = crypto.createHash('sha256').update(conteudo).digest('hex');

    // Cria PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;

    // Título
    page.drawText('CONTRATO DE TRANSPORTE ESCOLAR', {
      x: 50, y, size: 16, font,
    });
    y -= 30;

    // Motorista
    page.drawText(`Motorista: ${contrato.nomeCondutor || ""}`, { x: 50, y, size: 12, font });
    y -= 20;

    // Responsável
    const resp = contrato.contratado?.[0] || {};
    page.drawText(`Responsável: ${resp.nome || ""} - CPF: ${resp.cpf || ""} - Telefone: ${resp.telefone || ""}`, { x: 50, y, size: 12, font });
    y -= 20;

    // Alunos
    if (Array.isArray(contrato.Alunos)) {
      contrato.Alunos.forEach(aluno => {
        page.drawText(`Aluno: ${aluno.nome || ""} - Nasc: ${aluno.nascimento || ""}`, { x: 50, y, size: 12, font });
        y -= 15;
      });
    }

    // Forma de pagamento
    page.drawText(`Forma de pagamento: ${contrato.formaPagamento || ""}`, { x: 50, y, size: 12, font });
    y -= 15;

    page.drawText(`Valor total: R$ ${contrato.valorTotal || ""}`, { x: 50, y, size: 12, font });
    y -= 15;
    page.drawText(`Parcelas: ${contrato.numeroParcelas || ""} de R$ ${contrato.valorParcela || ""}`, { x: 50, y, size: 12, font });
    y -= 15;

    page.drawText(`Data pgto: ${contrato.dataPagamento || ""}`, { x: 50, y, size: 12, font });
    y -= 20;

    // Trajeto
    page.drawText(`Trajeto: ${contrato.tipoTrajeto === 1 ? "Ida e volta" : "Ida ou volta"}`, { x: 50, y, size: 12, font });
    y -= 20;

    // Data contrato
    const dataContrato = contrato.data?.[0];
    page.drawText(`Data contrato: ${dataContrato?.dia || ""}/${dataContrato?.mes || ""}/${dataContrato?.ano || ""}`, { x: 50, y, size: 12, font });
    y -= 30;

    // Assinatura digital
    page.drawText(`Assinatura Digital (SHA-256):`, { x: 50, y, size: 10, font });
    y -= 15;
    page.drawText(hash, { x: 50, y, size: 10, font });

    // Salva hash como subject e contrato JSON em Title
    pdfDoc.setSubject(hash);
    pdfDoc.setTitle(JSON.stringify(contrato));

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
      x: 50, y: 100, size: 12, font, color: rgb(0, 0, 0),
    });
    lastPage.drawText(assinatura, {
      x: 50, y: 80, size: 12, font, color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
    return Buffer.from(pdfBytes);
  }
};
