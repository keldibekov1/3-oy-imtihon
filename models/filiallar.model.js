import database from "../config/db";
import { DataTypes } from "sequelize";

const Filiallar = database.define("filiallar", {
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
    phone: {
        type: DataTypes.STRING,
        defaultValue: 0,
    },
    uquvmarkazId:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
});

export default Filiallar;
