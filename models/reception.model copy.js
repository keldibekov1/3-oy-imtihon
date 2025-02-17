import database from "../config/db";
import { DataTypes } from "sequelize";

const Reception = database.define("reception", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    uquvmarkazId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},{timestamps:true});

export default Reception;
