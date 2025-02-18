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
    unique: true,
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

export default Filial;
OquvMarkaz.hasMany(Filial, { foreignKey: "oquvmarkazId" }); // O'quv markazi bir nechta filialga ega bo'lishi mumkin
Filial.belongsTo(OquvMarkaz, { foreignKey: "oquvmarkazId" }); // Filial bitta o'quv markazga tegishli
