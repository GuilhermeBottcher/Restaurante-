import user from "../model/UserModel.js";

async function validarLogin(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await user.findOne({ where: { email: email } });

        if (!usuario) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }


        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        return res.status(200).json(usuario);  // Login bem-sucedido
    } catch (error) {
        return res.status(500).json({ message: "Erro ao validar login", error });
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
