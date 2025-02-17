const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Yonalish = sequelize.define("Yonalish", {
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
  faoliyatid: {
    type: DataTypes.BIGINT,
    references: {
      model: "Faoliyat",
      key: "id",
    },
  },
});

export default Yonalish;
