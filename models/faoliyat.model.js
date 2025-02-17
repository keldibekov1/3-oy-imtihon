import database from "../config/db";
import { DataTypes } from "sequelize";
import Filiallar from "./filiallar.model.js";

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
        references: {
            model: Filiallar,
            key: "id"
        }
    },
});

Filiallar.hasMany(Faoliyat,{ foreignKey: "filialId", onDelete: "CASCADE" })
Faoliyat.belongsTo(Filiallar,{ foreignKey: "filialId", onDelete: "CASCADE" })


export default Faoliyat;
