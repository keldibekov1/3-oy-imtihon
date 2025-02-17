import database from "../config/db.js";
import { DataTypes } from "sequelize";
import UquvMarkaz from "./uquvMarkaz.model.js";

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
        allowNull:true,
        references: {
            model: UquvMarkaz,
            key: "id"
        }
    }
});

UquvMarkaz.hasMany(Filiallar, { foreignKey: "uquvmarkazId", onDelete: "CASCADE" });
Filiallar.belongsTo(UquvMarkaz, { foreignKey: "uquvmarkazId", onDelete: "CASCADE" });

export default Filiallar;
