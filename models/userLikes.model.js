import { DataTypes } from "sequelize";
import database from "../config/db.js";

const UserLikes = database.define("UserLikes", {
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
});

export default UserLikes;
