const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Resurs = sequelize.define("Resurs", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nomi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.BIGINT,
    references: {
      model: "User",
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  resursCategoryId: {
    type: DataTypes.BIGINT,
    references: {
      model: "ResursCategory",
      key: "id",
    },
  },
});

export default Resurs;
