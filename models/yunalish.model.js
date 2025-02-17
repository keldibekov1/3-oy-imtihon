import database from "../config/db";
import { DataTypes } from "sequelize";

const Yunalish = database.define("Yunalish", {
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
    faoliyatId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default Yunalish;
