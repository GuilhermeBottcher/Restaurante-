import comanda from "../model/ComandaModel.js";

// Função para listar todas as comandas
async function listarComandas(request, response) {
    await comanda
        .findAll()
        .then(resultado => response.status(200).json(resultado))
        .catch(erro => response.status(500).json(erro));
}

// Função para selecionar uma comanda específica por ID
async function selecionarComanda(request, response) {
    await comanda
        .findByPk(request.params.id_comanda)
        .then(resultado => {
            if (resultado) {
                response.status(200).json(resultado);
            } else {
                response.status(404).json({ mensagem: "Comanda não encontrada" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}

// Função para criar uma nova comanda
async function criarComanda(request, response) {
    await comanda
        .create({
            num_mesa: request.body.nummesa,
            valor: request.body.valor
        })
        .then(resultado => response.status(201).json(resultado))
        .catch(erro => response.status(400).json(erro));
}

// Função para alterar uma comanda existente
async function fecharComanda(request, response) {
    await comanda
        .update(
            {
                fechada: true,
            },
            {
                where: {
                    id_comanda: request.params.id_comanda
                }
            }
        )
        .then(resultado => {
            if (resultado[0] === 1) { // Verifica se alguma linha foi alterada
                response.status(200).json({ mensagem: "Comanda fechada" });
            } else {
                response.status(404).json({ mensagem: "Comanda não encontrada" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}

async function abrirComanda(request, response) {
    await comanda
        .update(
            {
                fechada: true,
            },
            {
                where: {
                    id_comanda: request.params.id_comanda
                }
            }
        )
        .then(resultado => {
            if (resultado[0] === 1) { // Verifica se alguma linha foi alterada
                response.status(200).json({ mensagem: "Comanda aberta" });
            } else {
                response.status(404).json({ mensagem: "Comanda não encontrada" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}

// Função para excluir uma comanda
async function excluirComanda(request, response) {
    await comanda
        .destroy({
            where: {
                id_comanda: request.params.id_comanda
            }
        })
        .then(resultado => {
            if (resultado === 1) { // Verifica se alguma linha foi excluída
                response.status(200).json({ mensagem: "Comanda excluída com sucesso" });
            } else {
                response.status(404).json({ mensagem: "Comanda não encontrada" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}

export default { listarComandas, selecionarComanda, criarComanda, fecharComanda, abrirComanda, excluirComanda };
