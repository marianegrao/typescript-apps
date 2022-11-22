const express = require('express');
const rotas = express();
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require('./controladores/contas');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes');
const { verificarSenha, todosDadosPrenchidos, dadosJaExistentes, contaExistente, validarValor } = require('./intermediarios');

rotas.get('/contas', verificarSenha, listarContas);
rotas.post('/contas', todosDadosPrenchidos, dadosJaExistentes, criarConta);
rotas.put('/contas/:numeroConta/usuario', todosDadosPrenchidos, dadosJaExistentes, contaExistente, atualizarUsuario);
rotas.delete('/contas/:numeroConta', contaExistente, excluirConta);

rotas.post('/transacoes/depositar', validarValor, contaExistente, depositar);
rotas.post('/transacoes/sacar', validarValor, contaExistente, sacar);
rotas.post('/transacoes/transferir', validarValor, transferir);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);

module.exports = rotas;