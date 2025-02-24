import { DataTypes } from "sequelize";
import database from "../config/db.js";
import OquvMarkaz from "./uquvMarkaz.model.js"
import User from "./user.model.js";
const Comment = database.define("Comment", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: "id",
    },
  },
  oquvmarkazId: {
    type: DataTypes.BIGINT,
    references: {
      model: OquvMarkaz,
      key: "id",
    },
  },
  star: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

OquvMarkaz.hasMany(Comment, { foreignKey: "oquvmarkazId", as: "comments" });
Comment.belongsTo(OquvMarkaz, { foreignKey: "oquvmarkazId", as: "oquvmarkaz" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
export default Comment;
