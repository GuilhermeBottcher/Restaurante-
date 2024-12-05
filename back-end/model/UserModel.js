import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("users", {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})