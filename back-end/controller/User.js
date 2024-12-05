import user from "../model/UserModel.js";
import banco from "../banco.js";
async function validarLogin(request, response) {
    let { email, senha } = request.body;

    try {
        if (!email || !senha) {
            return response.status(400).json({ mensagem: "Email e senha são obrigatórios." });
        }

        const resultado = await banco.query(
            'SELECT id_usuario, nome, email FROM users WHERE email = :email_input AND senha = :senha_input',
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
        console.error("Erro ao validar login:", erro);
        response.status(500).json({ mensagem: "Erro ao tentar validar login.", erro: erro.message });
    }
}



async function criarUsuario(request, response) {
    let { nome, email, senha } = request.body;

    try {
        let usuario = await user.create({nome, email, senha});
        response.status(201).json({mensagem: "Usuário cadastrado com sucesso!"});
    } catch (error) {
        response.status(500).json({mensagem: "Erro ao cadastrar usuário."});
    }
}

export default { validarLogin, criarUsuario}