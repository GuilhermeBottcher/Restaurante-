import user from "../model/UserModel.js";

async function validarLogin(request, response) {
    let { email, senha } = request.body;
    
    try {
        const resultado = await banco.query(
            'SELECT * FROM validar_login(:email_input, :senha_input)',
            {
                replacements: { email_input: email, senha_input: senha },
                type: banco.QueryTypes.SELECT
            }
        );

        if (resultado.length > 0) {
            response.status(200).json({ mensagem: "Login realizado com sucesso!", usuario: resultado[0] });
        } else {
            response.status(401).json({ mensagem: "Email ou senha incorretos." });
        }
    } catch (erro) {
        response.status(500).json({ mensagem: "Erro ao tentar validar login.", erro });
    }
}

async function criarUsuario(request, response) {
    let { nome, email, senha } = request.body;

    try {
        let usuario = await user.create({ nome, email, senha });
        response.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        response.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
    }
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await user.findAll(); 
        res.status(200).json(usuarios); 
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar usuários.", erro }); 
    }
}

export default { validarLogin, criarUsuario, listarUsuarios };
