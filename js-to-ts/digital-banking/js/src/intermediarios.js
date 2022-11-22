let { contas } = require('./bancodedados');
const verificarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ mensagem: "O parametro da senha do banco precisa ser informado corretamente!" });
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
    }
    next();
}

const todosDadosPrenchidos = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome) {
        return res.status(400).json({ mensagem: "O nome do usuário precisa ser informado!" });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: "O cpf do usuário precisa ser informado!" });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: "A data nascimento do usuário precisa ser informada!" });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: "O telefone do usuário precisa ser informado!" });
    }
    if (!email) {
        return res.status(400).json({ mensagem: "O email do usuário precisa ser informado!" });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "O senha do usuário precisa ser informado!" });
    }
    next();
}
const dadosJaExistentes = (req, res, next) => {
    const { cpf, email } = req.body;
    const cpfJaExistente = contas.find(conta => { return conta.usuario.cpf === cpf; })
    const emailJaExistente = contas.find(conta => { return conta.usuario.email === email; })
    if (cpfJaExistente || emailJaExistente) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }
    next();
}

const contaExistente = (req, res, next) => {
    const numConta = req.body.numero_conta ? req.body.numero_conta : req.params.numeroConta;
    if (typeof (Number(numConta)) !== 'number') {
        return res.status(400).json({ mensagem: "O número da conta informado não é válido!" });
    }
    const contaEncontrada = contas.find(conta => { return conta.numero === Number(numConta) })
    if (!contaEncontrada) {
        return res.status(400).json({ mensagem: "A conta informada não foi encontrada" });
    }
    next();
}

const validarValor = (req, res, next) => {
    const { valor } = req.body;
    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor do depósito não deve ser negativo ou zerado!" });
    }
    next();
}
module.exports = {
    verificarSenha,
    todosDadosPrenchidos,
    dadosJaExistentes,
    contaExistente,
    validarValor
}