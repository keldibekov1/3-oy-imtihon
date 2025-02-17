import { DataTypes } from "sequelize";
import database from "../config/db.js";

const ResursCategory = database.define("ResursCategory", {
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
});

export default ResursCategory;
