import database from "../config/db";
import { DataTypes } from "sequelize";
import Faoliyat from "./faoliyat.model.js";

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
        references: {
            model: Faoliyat,
            key: "id"
        }
    },
});
Faoliyat.hasMany(Yunalish,{ foreignKey: "faoliyatId", onDelete: "CASCADE" } );
Yunalish.belongsTo(Faoliyat,{ foreignKey: "faoliyatId", onDelete: "CASCADE" } );

export default Yunalish;
