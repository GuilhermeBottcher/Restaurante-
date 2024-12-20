import pedido from "../model/PedidoModel.js";
import comanda from "../model/ComandaModel.js";
import cardapio from "../model/CardapioModel.js";


// Função para listar todos os pedidos da comanda
async function listarpedidos(request, response) {
    await pedido
        .findAll()
        .then(resultado => response.status(200).json(resultado))
        .catch(erro => response.status(500).json(erro));
}

// Função para selecionar item por pedido
async function selecionaritem(request, response) {
    await pedido
        .findByPk(request.params.id_pedido)
        .then(resultado => {
            if (resultado) {
                response.status(200).json(resultado);
            } else {
                response.status(404).json({ mensagem: "Pedido não encontrado" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}
// Função para selecionar pedidos de uma comanda específica
async function selecionarComandaitem(request, response) {
    await pedido
        .findAll({
            where: {
                id_comanda: request.params.id_comanda, // Filtro pelo id_comanda
            }
        })
        .then(resultado => {
            if (resultado.length > 0) { // Verifica se há pedidos retornados
                response.status(200).json(resultado);
            } else {
                response.status(404).json({ mensagem: "Nenhum pedido encontrado para esta comanda" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}


// Função para criar uma novo pedido e inserir item na comanda
async function criarpedido(request, response) {
    await pedido
        .create({
            id_comanda: request.body.id_comanda,
            cod_item: request.body.cod_item,
            quantidade: request.body.quantidade,
            status: request.body.status,
            tipo: request.body.tipo


        })
        .then(resultado => response.status(201).json(resultado))
        .catch(erro => response.status(400).json(erro));
}

// Função para alterar uma comanda existente
async function alterarpedido(request, response) {
    await pedido
        .update(
            {
                id_comanda: request.body.id_comanda,
                cod_item: request.body.cod_item,
                quantidade: request.body.quantidade
            },
            {
                where: {
                    id_pedido: request.params.id_pedido
                }
            }
        )
        .then(resultado => {
            if (resultado[0] === 1) { 
                response.status(200).json({ mensagem: "Comanda atualizada com sucesso" });
            } else {
                response.status(404).json({ mensagem: "Comanda não encontrada" });
            }
        })
        .catch(erro => response.status(400).json(erro));
}


async function listarPedidosCozinha(request, response) {
    await pedido
        .findAll({
            attributes: ['id_pedido', 'id_comanda', 'quantidade', 'status', 'tipo'],
            include: [
                {
                    model: cardapio,
                    attributes: ['nome', 'descricao'],
                    as: 'itens'
                }
            ],
            where: {
                tipo: true, // verifica se o pedido é feito na cozinha
                status: false
            }
        })
        .then(resultado => {
            if (resultado.length > 0){
                response.status(200).json(resultado)
            } else {
                response.status(404).json({mensagem: "Nenhum pedido para a cozinha"})
            }
        })
        .catch(erro => response.status(500).json(erro))
}

async function listarPedidosCopa(request, response) {
    await pedido
        .findAll({
            attributes: ['id_pedido', 'id_comanda', 'quantidade', 'status', 'tipo'],
            include: [
                {
                    model: cardapio,
                    attributes: ['nome', 'descricao'],
                    as: 'itens'
                }
            ],
            where: {
                tipo: false, // verifica se o pedido é feito na copa
                status: false
            }
        })
        .then(resultado => {
            if (resultado.length > 0){
                response.status(200).json(resultado)
            } else {
                response.status(404).json({mensagem: "Nenhum pedido para a copa"})
            }
        })
        .catch(erro => response.status(500).json(erro))
}

async function listarPedidosPendentes(request, response) {
    try {
        const resultado = await pedido.findAll({
            attributes: ['id_pedido', 'id_comanda', 'quantidade', 'status', 'tipo'],
            include: [
                {
                    model: cardapio,
                    attributes: ['nome', 'descricao'],
                    as: 'itens'
                }
            ],
            where: {
                status: false
            }
        });

        if (resultado.length > 0) {
            response.status(200).json(resultado);
        } else {
            response.status(404).json({ mensagem: "Nenhum pedido foi feito ainda" });
        }
    } catch (erro) {
        response.status(500).json(erro);
    }
}

async function alterarStatusPedido(request, response) {
    const { status } = request.body; // Extrai o status do corpo da requisição

    if (status === undefined) {
        return response.status(400).json({ mensagem: "Status não fornecido." });
    }

    try {
        const resultado = await pedido.update(
            {
                status: status, // Atualiza o status do pedido
            },
            {
                where: {
                    id_pedido: request.params.id_pedido, // Atualiza o pedido com o id especificado
                },
            });

        if (resultado[0] === 1) { // Verifica se uma linha foi alterada
            response.status(200).json({ mensagem: "Status do pedido atualizado com sucesso" });
        } else {
            response.status(404).json({ mensagem: "Pedido não encontrado" });
        }
    } catch (erro) {
        console.error(erro); // Para melhor debug
        response.status(400).json({ mensagem: "Erro ao atualizar o status do pedido", erro });
    }
}


export default { listarpedidos, selecionaritem, criarpedido, alterarpedido, selecionarComandaitem, listarPedidosCozinha, listarPedidosCopa, listarPedidosPendentes, alterarStatusPedido };
