const { format } = require('date-fns');
let { contas, depositos, saques, transferencias } = require('../bancodedados')

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor) return res.status(400).json({ mensagem: "Todos campos são obrigatórios!" });
    const conta = contas.find(conta => { return conta.numero === Number(numero_conta) })
    conta.saldo += valor;
    const novoDeposito = {
        data: format(new Date(), 'uuuu-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }
    depositos.push(novoDeposito);
    return res.status(204).send();
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha) return res.status(400).json({ mensagem: "Todos campos são obrigatórios!" });
    const conta = contas.find(conta => { return conta.numero === Number(numero_conta) })

    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: "A senha informada é inválida!" })
    }
    if (conta.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para realizar saque!" })
    }

    conta.saldo -= valor;
    const novoSaque = {
        data: format(new Date(), 'uuuu-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }
    saques.push(novoSaque);
    return res.status(204).send();
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (numero_conta_origem && !numero_conta_destino && !valor && !senha) {
        return res.status(400).json({ "mensagem": "Todos campos são obrigatórios!" })
    }
    const contaOrigem = contas.find((conta) => { return conta.numero === Number(numero_conta_origem) });
    const contaDestino = contas.find((conta) => { return conta.numero === Number(numero_conta_destino) });

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ "mensagem": "A conta informada não foi encontrada!" });
    }
    if (contaOrigem === contaDestino) {
        return res.status(404).json({ "mensagem": "As contas são iguais!" });
    }
    if (contaOrigem.saldo < valor) {
        return res.status(400).json({ "mensagem": "Saldo insuficiente para realizar transferência!" })
    }
    if (senha !== contaOrigem.usuario.senha) {
        return res.status(404).json({ "mensagem": "A senha informada é inválida!" });
    }
    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    const novaTransf = {
        data: format(new Date(), 'uuuu-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(novaTransf);
    return res.status(204).send();
}

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta && !senha) {
        return res.status(400).json({ "mensagem": "O número da conta e senha são obrigatórios!" })
    }
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    })

    if (!conta) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontada!" });
    }

    if (senha !== conta.usuario.senha) {
        return res.status(404).json({ "mensagem": "A senha informada é inválida!" });
    }
    return res.json({ "saldo": conta.saldo });
}

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta && !senha) {
        return res.status(400).json({ "mensagem": "O número da conta e senha são obrigatórios!" })
    }
    const conta = contas.find(conta => { return conta.numero === Number(numero_conta) });
    if (!conta) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontada!" });
    }
    if (senha !== conta.usuario.senha) {
        return res.status(404).json({ "mensagem": "A senha informada é inválida!" });
    }
    let contaExtrato = {
        depositos: [],
        saques: [],
        transferenciasEnviadas: [],
        transferenciasRecebidas: []
    }
    depositos.forEach((deposito) => {
        if (deposito.numero_conta === Number(numero_conta)) {
            contaExtrato.depositos.push(deposito);
        };
    })
    saques.forEach((saque) => {
        if (saque.numero_conta === Number(numero_conta)) {
            contaExtrato.saques.push(saque);
        };
    })
    transferencias.forEach((transf) => {
        if (transf.numero_conta_origem === Number(numero_conta)) {
            contaExtrato.transferenciasEnviadas.push(transf);
        } else if (transf.numero_conta_destino === Number(numero_conta)) {
            contaExtrato.transferenciasRecebidas.push(transf);
        };
    })
    return res.send(contaExtrato);
}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}