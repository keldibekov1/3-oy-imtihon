import database from "../config/db";
import { DataTypes } from "sequelize";

const Faoliyat = database.define("faoliyat", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    filialId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default Faoliyat;
