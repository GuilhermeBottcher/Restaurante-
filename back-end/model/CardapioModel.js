import { Sequelize } from "sequelize";
import banco from "../banco.js";

export const cardapio = banco.define("cardapio", {
    cod_item: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Outros campos do cardápio
});

export default cardapio;
