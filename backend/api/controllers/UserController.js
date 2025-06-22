const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

  // Registro de novo usuário
  register: async (req, res) => {
    try {
      const { nome, email, senha, role, foto } = req.body;

      if (!nome || !email || !senha || !role) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
      }

      const existe = await Usuario.findOne({ email });
      if (existe) {
        return res.status(409).json({ erro: 'E-mail já cadastrado.' });
      }

      const novoUsuario = await Usuario.create({ nome, email, senha, role, foto }).fetch();

      const token = jwt.sign(
        { id: novoUsuario.id, email: novoUsuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      const { senha: _, ...usuarioSemSenha } = novoUsuario;

      return res.status(201).json({ token, usuario: usuarioSemSenha });

    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário.', detalhes: err.message });
    }
  },

  // Login
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

      return res.json({ token, usuario: usuarioSemSenha });

    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao realizar login.', detalhes: err.message });
    }
  },

  // Retorna o perfil do usuário logado
  me: async (req, res) => {
    try {
      const usuario = await Usuario.findOne({ id: req.usuario.id }).omit(['senha']);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      return res.json(usuario);

    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhes: err.message });
    }
  }

};
