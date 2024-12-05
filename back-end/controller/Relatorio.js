import banco from "../banco.js";

async function relatorioVendasDiarias(request, response) {
    let { data } = request.query;
    try {
        if (!data) {
            return response.status(400).json({ mensagem: "Parâmetro 'data' é obrigatório."});
        }

        
        let resultado = await banco.query(
            `
            SELECT 
                p.id_pedido, 
                p.quantidade, 
                p.data_hora, 
                c.nome AS nome_item, 
                c.valor AS valor_item, 
                c.descricao
            FROM 
                pedido p
            JOIN 
                cardapio c ON p.cod_item = c.cod_item
            WHERE 
                p.data_hora BETWEEN $1 AND $2
            ORDER BY 
                p.data_hora ASC
            `,
            {
                type: banco.QueryTypes.SELECT,
                bind: [
                    `${data} 00:00:00`,
                    `${data} 23:59:59`
                ]
            }
        );

        if (relatorioVendasDiarias.length === 0) {
            return response.status(404).json({ mensagem: "Nenhuma venda encontrada"})
        }

        response.status(200).json(resultado);
    } catch (erro) {
        response.status(500).json({ mensagem: "Erro ao gerar relatório", erro})
    }
}

export default { relatorioVendasDiarias }