const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = sails.models.user;

module.exports = {

  // // ...

  // register: async (req, res) => {
  //   try {
  //     const { nome, email, senha, confirmarSenha, cpf, celular, codigoPais, role } = req.body;

  //     // ... (resto igual)

  //     const existente = await User.findOne({ email }); // <-- User
  //     if (existente) {
  //       return res.status(400).json({ erro: 'E-mail já cadastrado.' });
  //     }

  //     const novoUsuario = await User.create({
  //       nome,
  //       email,
  //       senha,
  //       cpf,
  //       celular,
  //       codigoPais,
  //       role
  //     }).fetch();

  //     return res.status(201).json({
  //       mensagem: 'Usuário cadastrado com sucesso!',
  //       usuario: { id: novoUsuario.id, email: novoUsuario.email }
  //     });
  //   } catch (err) {
  //     return res.status(500).json({
  //       erro: 'Erro no cadastro',
  //       detalhes: err.message
  //     });
  //   }
  // },

  register: async (req, res) => {
    try {
      const { nome, email, senha, confirmarSenha, cpf, celular, codigoPais, role } = req.body;

      if (!nome || !email || !senha || !confirmarSenha || !cpf || !celular || !role) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
      }

      if (senha !== confirmarSenha) {
        return res.status(400).json({ erro: 'As senhas não coincidem.' });
      }

      const existente = await User.findOne({ email });
      if (existente) {
        return res.status(400).json({ erro: 'E-mail já cadastrado.' });
      }

      const novoUsuario = await User.create({
        nome,
        email,
        senha,
        cpf,
        celular,
        codigoPais,
        role
      }).fetch();

      return res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          role: novoUsuario.role
        }
      });
    } catch (err) {
      return res.status(500).json({
        erro: 'Erro no cadastro',
        detalhes: err.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;


      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
      }

      const usuario = await User.findOne({ email });
      console.log('👤 Usuário encontrado:', usuario);

      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário não encontrado.' });
      }

      console.log('🔒 Hash no banco:', usuario.senha);

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      console.log('✅ Resultado bcrypt.compare:', senhaCorreta);

      if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Senha incorreta.' });
      }

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return res.json({
        mensagem: 'Login realizado com sucesso!',
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          nome: usuario.nome,
          role: usuario.role
        }
      });
    } catch (err) {
      console.error('💥 Erro interno no login:', err);
      return res.status(500).json({ erro: 'Erro no login', detalhes: err.message });
    }
  },

  listarResponsaveis: async (req, res) => {
    try {
      const responsaveis = await User.find({ role: 'responsavel' });
      return res.json(responsaveis);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao buscar responsáveis' });
    }
  },

  me: async (req, res) => {
    try {

      const usuario = await User.findOne({ id: req.usuario.id }).omit(['senha']); // <-- CORRIGIDO
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      return res.json(usuario);
    } catch (err) {
      console.error('💥 Erro no /auth/me:', err);

      return res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhes: err.message });
    }
  },
};
