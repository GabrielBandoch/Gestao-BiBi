const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const crypto = require('crypto');

module.exports = {
  gerarPdf: async (contrato) => {
    if (!contrato) throw new Error("Contrato não fornecido ao gerarPdf");

    const conteudo = JSON.stringify(contrato);
    const hash = crypto.createHash('sha256').update(conteudo).digest('hex');

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const margin = 50;
    const lineHeight = 18;
    let page = pdfDoc.addPage([595.28, 841.89]); // A4
    let { height, width } = page.getSize();
    let y = height - margin;

    const escreverTextoQuebrado = (page, text, x, y, font, fontSize, maxWidth) => {
      const words = text.split(' ');
      let line = '';
      const lines = [];

      for (let word of words) {
        const testLine = line + word + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxWidth) {
          lines.push(line.trim());
          line = word + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      for (let l of lines) {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([595.28, 841.89]);
          y = height - margin;
        }
        page.drawText(l, { x, y, font, size: fontSize });
        y -= lineHeight;
      }

      return y;
    };

    const linha = () => {
      y -= 5;
      page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 0.5, color: rgb(0.5, 0.5, 0.5) });
      y -= 10;
    };

    page.drawText('CONTRATO DE TRANSPORTE ESCOLAR', {
      x: margin,
      y,
      size: 16,
      font,
    });
    y -= 2 * lineHeight;

    linha();

    y = escreverTextoQuebrado(page, `RESPONSÁVEL: ${contrato.contratado?.[0]?.nome || ""}`, margin, y, font, fontSize, width - 2 * margin);
    y = escreverTextoQuebrado(page, `CPF: ${contrato.contratado?.[0]?.cpf || ""}   RG: ${contrato.contratado?.[0]?.rg || ""}`, margin, y, font, fontSize, width - 2 * margin);
    y = escreverTextoQuebrado(page, `Endereço: ${contrato.contratado?.[0]?.endereco || ""}, Nº ${contrato.contratado?.[0]?.numeroCasa || ""}, Bairro ${contrato.contratado?.[0]?.bairro || ""}, CEP ${contrato.contratado?.[0]?.cep || ""}`, margin, y, font, fontSize, width - 2 * margin);
    y = escreverTextoQuebrado(page, `Telefone: ${contrato.contratado?.[0]?.telefone || ""}`, margin, y, font, fontSize, width - 2 * margin);

    linha();

    if (Array.isArray(contrato.Alunos)) {
      for (const aluno of contrato.Alunos) {
        y = escreverTextoQuebrado(page, `Aluno: ${aluno.nome} - Nasc.: ${aluno.nascimento}`, margin, y, font, fontSize, width - 2 * margin);
      }
    }

    linha();

    y = escreverTextoQuebrado(page, `Trajeto: ${contrato.tipoTrajeto === 1 ? "Ida e Volta" : "Ida ou Volta"}`, margin, y, font, fontSize, width - 2 * margin);
    y = escreverTextoQuebrado(page, `Forma de Pagamento: ${contrato.formaPagamento}`, margin, y, font, fontSize, width - 2 * margin);
    y = escreverTextoQuebrado(page, `Valor total: R$ ${contrato.valorTotal} (${contrato.numeroParcelas}x de R$ ${contrato.valorParcela})`, margin, y, font, fontSize, width - 2 * margin);
    y = escreverTextoQuebrado(page, `Data de pagamento: ${contrato.dataPagamento}`, margin, y, font, fontSize, width - 2 * margin);

    linha();

    const clausulas = [
      "CLÁUSULA PRIMEIRA – DO OBJETO: O CONTRATADO compromete-se a transportar o ALUNO da sua residência até a escola e vice-versa, conforme acordado.",
      "CLÁUSULA SEGUNDA – DO PRAZO E VALOR DO CONTRATO: O valor estipulado será o da ficha de cadastro. Em caso de atraso, serão aplicadas multas e juros conforme legislação vigente.",
      "CLÁUSULA TERCEIRA – DAS OBRIGAÇÕES DO CONTRATANTE E DO ALUNO: O ALUNO deverá cumprir horários e respeitar o CONTRATADO. O CONTRATANTE será responsável por danos causados pelo aluno.",
      "CLÁUSULA QUARTA – DAS OBRIGAÇÕES DO CONTRATADO: O CONTRATADO deve oferecer transporte seguro, zelar pelo cumprimento dos horários e comunicar mudanças de rota quando necessário.",
      "CLÁUSULA QUINTA – DA EXECUTIVIDADE: Este instrumento tem força de título executivo extrajudicial, conforme artigo 784 do CPC.",
      "CLÁUSULA SEXTA – DA PENALIDADE: Em caso de descumprimento, multa de 20% sobre o valor e despesas judiciais.",
      "CLÁUSULA SÉTIMA – DECLARAÇÃO DE VONTADE: As partes declaram ciência e aceitação de todas as cláusulas.",
      "CLÁUSULA OITAVA – DO FORO: Fica eleito o foro de Joinville/SC para dirimir qualquer questão."
    ];

    clausulas.forEach((clausula) => {
      y = escreverTextoQuebrado(page, clausula, margin, y, font, fontSize, width - 2 * margin);
      y -= 5;
    });

    linha();

    const data = contrato.data?.[0];
    const dataStr = data ? `${data.dia} de ${data.mes} de ${data.ano}` : "____ de __________ de ______";

    y = escreverTextoQuebrado(page, `Joinville, ${dataStr}`, margin, y - 20, font, fontSize, width - 2 * margin);

    // y -= 80;
    // page.drawText("_________________________", { x: margin, y, font, size: fontSize }); // contratante
    // page.drawText("Assinatura do Contratante", { x: margin, y: y - 15, font, size: fontSize });

    // page.drawText("_________________________", { x: width / 2 + 20, y, font, size: fontSize }); // contratado
    // page.drawText("Assinatura do Contratado", { x: width / 2 + 20, y: y - 15, font, size: fontSize });

    y -= 100;

    // Contratante (responsável)
    page.drawText(contrato.contratado?.[0]?.nome || "", {
      x: margin,
      y: y + 20,
      font,
      size: fontSize,
    });

    page.drawText("_________________________", {
      x: margin,
      y,
      font,
      size: fontSize,
    });
    page.drawText("Assinatura do Contratante", {
      x: margin,
      y: y - 15,
      font,
      size: fontSize,
    });

    // Contratado (motorista)
    page.drawText(contrato.nomeMotorista || "", {
      x: width / 2 + 20,
      y: y + 20,
      font,
      size: fontSize,
    });

    page.drawText("_________________________", {
      x: width / 2 + 20,
      y,
      font,
      size: fontSize,
    });
    page.drawText("Assinatura do Contratado", {
      x: width / 2 + 20,
      y: y - 15,
      font,
      size: fontSize,
    });


    y = 50;
    page.drawText("Assinatura digital (hash):", { x: margin, y, font, size: 8 });
    page.drawText(hash, { x: margin, y: y - 10, font, size: 8 });

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
    const lastPage = pdfDoc.getPages().at(-1);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Posiciona um pouco acima da linha do contratante
    lastPage.drawText(assinatura, { x: 50, y: 635, size: 12, font });

    return Buffer.from(await pdfDoc.save({ useObjectStreams: false }));
  },

  assinarPorMotorista: async (buffer, assinatura) => {
    const pdfDoc = await PDFDocument.load(buffer);
    const lastPage = pdfDoc.getPages().at(-1);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Posiciona um pouco acima da linha do contratado
    lastPage.drawText(assinatura, { x: 330, y: 635, size: 12, font });

    return Buffer.from(await pdfDoc.save({ useObjectStreams: false }));
  },


};
