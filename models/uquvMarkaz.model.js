import database from "../config/db";
import { DataTypes } from "sequelize";

const UquvMarkaz = database.define("uquvMarkaz", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filiallar_soni: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

export default UquvMarkaz;
