import { DataTypes } from "sequelize";
import database from "../config/db.js";

const OquvMarkaz = database.define("OquvMarkaz", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.BIGINT,
    references: {
      model: "User", 
      key: "id",
    },
    allowNull: false,
  },
});


export default OquvMarkaz;
