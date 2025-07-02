/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {


  // '*': true,
  UserController: {
    me: 'Middleware'
  },


  RelatorioController: {
    assinar: 'Middleware',
    assinarResponsavel: 'Middleware',
    verificarAssinatura: 'Middleware',
    baixar: 'Middleware',
    enviarEmail: 'Middleware',
    listarPendentesMotorista: 'Middleware',
    assinarFinalMotorista: 'Middleware',
  },

  ContratoController: {
    listar: 'Middleware',
  },


};
