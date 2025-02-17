import { DataTypes } from "sequelize";
import database from "../config/db.js";


const Like = database.define("like", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    oquvmarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: oquvmarkaz,
            key: "id"
        }
    }
})

export default Like;