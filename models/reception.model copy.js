import database from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Filiallar from "./filiallar.model.js";

const Reception = database.define("reception", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    filialId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Filiallar,
            key: "id"
        }
    },
},{timestamps:true});
User.hasMany(Reception,{ foreignKey: "userId", onDelete: "CASCADE" })
Filiallar.hasMany(Reception,{ foreignKey: "filialId", onDelete: "CASCADE" })
Reception.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Reception.belongsTo(Filiallar, { foreignKey: "filialId", onDelete: "CASCADE" });

export default Reception;
