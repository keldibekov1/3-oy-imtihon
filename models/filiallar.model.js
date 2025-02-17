const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Filial = sequelize.define("Filial", {
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
      model: "OquvMarkaz",
      key: "id",
    },
  },
});

export default Filial;
