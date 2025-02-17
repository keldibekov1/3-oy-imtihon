const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OquvMarkaz = sequelize.define("OquvMarkaz", {
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
