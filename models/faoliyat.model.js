import database from "../config/db.js";
import { DataTypes } from "sequelize";
import OquvMarkaz from "./uquvMarkaz.model.js";

const Faoliyat = database.define("Faoliyat", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    oquvmarkazId: {
      type: DataTypes.BIGINT,
      references: {
        model: OquvMarkaz,
        key: "id",
      },
    },
  });
  
OquvMarkaz.hasMany(Faoliyat, { foreignKey: "oquvmarkazId" }); // Bir o'quv markazda bir nechta faoliyat
Faoliyat.belongsTo(OquvMarkaz, { foreignKey: "oquvmarkazId" });
  export default Faoliyat;