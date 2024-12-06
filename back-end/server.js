import express from "express";
import banco from "./banco.js";
import cors from "cors";
import cardapio from "./controller/Cardapio.js";
import Comanda from "./controller/Comanda.js";
import Pedido from "./controller/Pedido.js";
import Usuario from "./controller/User.js";
import Relatorio from "./controller/Relatorio.js";

try{
    await banco.authenticate();
    console.log('Conexão estabelecida com sucesso!');
} catch (error){
    console.log("Não foi possível conectar com o banco de dados: ", error);
}

const app = express();

import routes from './src/routes.js';

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req,res)=>{
    res.send('hello word')})

// Métodos Cardapio
app.get("/cardapio", cardapio.listarCardapio);
app.get("/cardapio/:cod_item", cardapio.selecionarItem);
app.post("/cardapio", cardapio.criarItem);
app.patch("/cardapio/:cod_item", cardapio.criarItem)


//metodos comanda

app.get("/comanda", Comanda.listarComandas);
app.get("/comanda/:id_comanda", Comanda.selecionarComanda);
app.post("/comanda", Comanda.criarComanda);
app.put("/fechar-comanda/id_comanda", Comanda.fecharComanda);
app.put("/abrir-comanda/id_comanda", Comanda.abrirComanda);

//medotos pedido

app.get("/pedido", Pedido.listarpedidos);
app.get("/pedido/:id_pedido", Pedido.selecionaritem);
app.get("/pedidos/:id_comanda", Pedido.selecionarComandaitem);
app.get("/cozinha/pedidos", Pedido.listarPedidosCozinha);
app.get("/copa/pedidos", Pedido.listarPedidosCopa);
app.get("/pedidos/status/pendentes", Pedido.listarPedidosPendentes)
app.post("/pedido", Pedido.criarpedido);
app.patch("/pedido/:id_pedido", Pedido.alterarpedido);
app.put("/pedido/alterar-status/:id_pedido", Pedido.alterarStatusPedido);

// métodos usuario
app.post("/login", Usuario.validarLogin);
app.post("/usuarios", Usuario.criarUsuario);

// relatório
app.get("/relatorios/vendas-diarias", Relatorio.relatorioVendasDiarias); // exemplo de query http://localhost:4000/relatorios/vendas-diarias?data=2024-11-04

app.listen(4000);