let { contas } = require('../bancodedados');
let idConta = 1;

const listarContas = (req, res) => {
    return res.json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const novaConta = {
        numero: idConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(novaConta);
    idConta++
    return res.status(201).send();
}

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;
    const contaEncontrada = contas.find(conta => { return conta.numero === Number(numeroConta) })
    const modificarDado = contaEncontrada.usuario
    modificarDado.nome = nome;
    modificarDado.cpf = cpf;
    modificarDado.data_nascimento = data_nascimento;
    modificarDado.telefone = telefone;
    modificarDado.email = email;
    modificarDado.senha = senha;
    return res.status(201).send();
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const contaEncontrada = contas.find(conta => { return conta.numero === Number(numeroConta) })
    if (contaEncontrada.saldo !== 0) {
        return res.status(404).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" });
    }
    const indiceContaExcluida = contas.findIndex(conta => conta.numero === Number(numeroConta))
    contas.splice(indiceContaExcluida, 1)
    return res.status(204).send();
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
}