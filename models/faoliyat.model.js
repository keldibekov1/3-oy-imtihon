import database from "../config/db.js";
import { DataTypes } from "sequelize";
import Filial from "./filiallar.model.js";

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
    filialId: {
      type: DataTypes.BIGINT,
      references: {
        model: Filial,
        key: "id",
      },
    },
  });
  
  Filial.belongsTo(Faoliyat);
  Faoliyat.hasMany(Filial);
  export default Faoliyat;