import database from "../config/db.js";
import { DataTypes}  from "sequelize"
import UquvMarkaz from "./uquvMarkaz.model.js";
import User from "./user.model.js";

const Comment = database.define("comment", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    desciription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oquvmarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UquvMarkaz,
            key: "id"
        }
    }

}, {timestamps: true})

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

UquvMarkaz.hasMany(Comment, { foreignKey: "oquvmarkazId" });
Comment.belongsTo(UquvMarkaz, { foreignKey: "oquvmarkazId" });

export default Comment;