import { DataTypes } from "sequelize";
import database from "../config/db.js";
import OquvMarkaz from "./uquvMarkaz.model.js"
import User from "./user.model.js";
const Reception = database.define("Reception", {
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Reception;
