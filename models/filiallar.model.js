import database from "../config/db.js"
import { DataTypes } from "sequelize";
import OquvMarkaz from "./uquvMarkaz.model.js";

const Filial = database.define("Filial", {
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
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oquvmarkazId: {
    type: DataTypes.BIGINT,
    references: {
      model: OquvMarkaz,
      key: "id",
    },
  },
});

OquvMarkaz.hasMany(Filial, { foreignKey: "oquvmarkazId", as: "filials" });
Filial.belongsTo(OquvMarkaz, { foreignKey: "oquvmarkazId", as: "oquvMarkaz" });
export default Filial;
