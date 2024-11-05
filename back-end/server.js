import express from "express";
import banco from "./banco.js";
import cors from "cors";
import cardapio from "./controller/Cardapio.js";

try{
    await banco.authenticate();
    console.log('Conexão estabelecida com sucesso!');
} catch (error){
    console.log("Não foi possível conectar com o banco de dados: ", error);
}

const app = express();
app.use(express.json());
app.use(cors());

// Métodos Cardapio
app.get("/cardapio", cardapio.listarCardapio);
app.get("/cardapio/:cod_item", cardapio.selecionarItem);
app.post("/cardapio", cardapio.criarItem);
app.patch("/cardapio/:cod_item", cardapio.criarItem)

app.listen(4000);