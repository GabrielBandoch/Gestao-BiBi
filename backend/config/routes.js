/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 */

module.exports.routes = {

  // Página inicial padrão (exemplo)
  '/': { view: 'pages/homepage' },

  // ============================
  // PDF / RELATÓRIOS
  // ============================
  'POST /relatorio/assinar': 'RelatorioController.assinar',
  'POST /relatorio/assinarResponsavel': 'RelatorioController.assinarResponsavel',
  'POST /relatorio/verificar': 'RelatorioController.verificarAssinatura',
  'GET /relatorio/baixar/:mongoId': 'RelatorioController.baixar',
  'POST /relatorio/enviar-email': 'RelatorioController.enviarEmail',
  'GET /api/usuario/responsaveis': 'UserController.listarResponsaveis',
  'GET /contrato/listar': 'ContratoController.listar',
  'GET /contrato/pendentes': 'RelatorioController.listarPendentesMotorista',
  'POST /contrato/assinar-final': 'RelatorioController.assinarFinalMotorista',

  // Autenticação
  'POST /auth/register': 'User.register',
  'POST /auth/login': 'User.login',
  'GET /auth/me': 'User.me',
};
