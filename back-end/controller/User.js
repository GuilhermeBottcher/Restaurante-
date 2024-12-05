import bcrypt from "bcrypt";
import user from "../model/UserModel.js"; 

async function validarLogin(req, res) {
    const { email, senha } = req.body;

    try {
        // Verificando se os campos obrigatórios estão presentes
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // Buscando o usuário pelo email
        const usuario = await user.findOne({ where: { email: email } });

        // Verificando se o usuário existe
        if (!usuario) {
            return res.status(401).json({ message: "Usuário não encontrado." });
        }

        // Log para verificar os dados do usuário
        console.log("Usuário encontrado:", usuario);

        // Comparando a senha fornecida com a senha armazenada
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        // Log para verificar a comparação da senha
        console.log("Senha fornecida:", senha);
        console.log("Senha armazenada:", usuario.senha);
        console.log("Senha correta:", senhaCorreta);

        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha incorreta." });
        }

        // Respondendo com dados básicos do usuário
        return res.status(200).json({
            message: "Login bem-sucedido.",
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
            },
        });
    } catch (error) {
        console.error("Erro ao validar login:", error); // Log para depuração
        return res.status(500).json({ message: "Erro ao validar login.", error: error.message });
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
