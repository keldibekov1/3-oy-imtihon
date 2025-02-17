const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ResursCategory = sequelize.define("ResursCategory", {
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
});

export default ResursCategory;
