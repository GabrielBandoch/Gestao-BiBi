const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
      }

      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário não encontrado.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      const { senha: _, ...usuarioSemSenha } = usuario;

      const foto = await User_Foto.findOne({ usuario: usuario.id });
      usuarioSemSenha.imagem = foto
        ? `http://localhost:1337/` // CONFIGURAR A ROTA
        : null;

      return res.json({ token, usuario: usuarioSemSenha });
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao realizar login.', detalhes: err.message });
    }
  },

  me: async (req, res) => {
    try {
      const usuario = await Usuario.findOne({ id: req.usuario.id }).omit(['senha']);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      const foto = await User_Foto.findOne({ usuario: req.usuario.id });
      usuario.imagem = foto
        ? `http://localhost:1337/` // CONFIGURAR A ROTA
        : null;

      return res.json(usuario);
    } catch (err) {
      console.error('💥 Erro no /auth/me:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhes: err.message });
    }
  }
};
