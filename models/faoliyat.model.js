import database from "../config/db.js";
import { DataTypes } from "sequelize";

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
        model: "Filial",
        key: "id",
      },
    },
  });
  

  export default Faoliyat;