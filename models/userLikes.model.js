import { DataTypes } from "sequelize";
import database from "../config/db.js";
import UquvMarkaz from "./uquvMarkaz.model.js"
import User from "./user.model.js";
const UserLikes = database.define("UserLikes", {
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
      model: UquvMarkaz,
      key: "id",
    },
  },
});

export default UserLikes;
