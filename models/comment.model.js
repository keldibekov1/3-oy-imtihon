import { DataTypes } from "sequelize";
import database from "../config/db.js";

const Comment = database.define("Comment", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: "User",
      key: "id",
    },
  },
  oquvmarkazId: {
    type: DataTypes.BIGINT,
    references: {
      model: "OquvMarkaz",
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

export default Comment;
