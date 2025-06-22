module.exports.routes = {

  // PDF
  '/': { view: 'pages/homepage' },
  'POST /relatorio/assinar': 'RelatorioController.assinar',
  'POST /relatorio/verificar': 'RelatorioController.verificarAssinatura',
  'GET /relatorio/baixar/:mongoId': 'RelatorioController.baixar',

  // Usuário
  'POST /auth/register': 'User.register',
  'POST /auth/login': 'User.login',
  'GET /auth/me': { controller: 'User', action: 'me', policy: 'Middleware' },
};
