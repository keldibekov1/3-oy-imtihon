import { DataTypes } from "sequelize";
import database from "../config/db.js";
import User from "./user.model.js";
import UquvMarkaz from "./uquvMarkaz.model.js";

const Like = database.define("like", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    oquvmarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UquvMarkaz,
            key: "id",
        },
        onDelete: "CASCADE"
    }
}, {
    timestamps: true,
});

export default Like;
