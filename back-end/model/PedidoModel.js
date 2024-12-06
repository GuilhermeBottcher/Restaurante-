import { Sequelize } from "sequelize";
import banco from "../banco.js";
import cardapio from "./CardapioModel.js";
import comanda from "./ComandaModel.js";

const pedido = banco.define("pedido", {
    id_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_comanda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: comanda,
            key: 'id_comanda'
        }
    },
    cod_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: cardapio,
            key: 'cod_item'
        }
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    tipo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

cardapio.hasMany(pedido, { foreignKey: 'cod_item' });
pedido.belongsTo(cardapio, { as: 'itens', foreignKey: 'cod_item' });

comanda.hasMany(pedido, { foreignKey: 'id_comanda' });
pedido.belongsTo(comanda, { foreignKey: 'id_comanda' });

export default pedido;
