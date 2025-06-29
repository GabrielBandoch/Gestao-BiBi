const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = {
  enviar: async ({ to, subject, text, buffer, filename }) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'teste@gmail.com',
        to,
        subject,
        text,
      };

      // Se tiver buffer e filename, adiciona attachment
      if (buffer && filename) {
        mailOptions.attachments = [
          {
            filename,
            content: buffer
          }
        ];
      }

      const info = await transporter.sendMail(mailOptions);

      console.log(`✉️ Email enviado para ${to} - MessageId: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('💥 Erro ao enviar email:', error);
      throw error;
    }
  }
};
