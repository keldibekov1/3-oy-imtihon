import { DataTypes } from "sequelize";
import database from "../config/db.js";
import User from "./user.model.js";
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
        model: User, 
        key: "id",
    },
    allowNull: false,
},
});

User.hasMany(OquvMarkaz, { foreignKey: "createdBy" });
OquvMarkaz.belongsTo(User, { as: "creator", foreignKey: "createdBy" });

export default OquvMarkaz;
