import { DataTypes } from "sequelize";
import database from "../config/db";
import User from "./user.model.js";
import Like from "./like.model.js";
import UquvMarkaz from "./uquvMarkaz.model.js";

const UserLike = database.define("userLike", {

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    likeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Like,
            key: "id"
        }
    }
})

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

UquvMarkaz.hasMany(Like, { foreignKey: "oquvmarkazId" });
Like.belongsTo(UquvMarkaz, { foreignKey: "oquvmarkazId" });

User.belongsToMany(UquvMarkaz, { through: UserLike, foreignKey: "userId" });
UquvMarkaz.belongsToMany(User, { through: UserLike, foreignKey: "uquvmarkazId" });


export default UserLike;