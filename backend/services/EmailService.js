const nodemailer = require('nodemailer');

module.exports = {
  enviar: async ({ to, subject, text, buffer, filename }) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teste@gmail.com',
        pass: 'senhateste123'
      }
    });

    await transporter.sendMail({
      from: 'teste@gmail.com',
      to,
      subject,
      text,
      attachments: [
        {
          filename,
          content: buffer
        }
      ]
    });
  }
};