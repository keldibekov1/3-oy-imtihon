import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Faoliyat from "./faoliyat.model.js";
const Yonalish = database.define("Yonalish", {
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
  faoliyatId: {
    type: DataTypes.BIGINT,
    references: {
      model: Faoliyat,
      key: "id",
    },
  },
});

export default Yonalish;
