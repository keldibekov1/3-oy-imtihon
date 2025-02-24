import { DataTypes } from "sequelize";
import database from "../config/db.js";
import User from "./user.model.js";
import ResursCategory from "./resursCategory.model.js"
const Resurs = database.define("Resurs", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Nomi kiritilishi shart" },
      notEmpty: { msg: "Nomi bo‘sh bo‘lishi mumkin emas" },
    },
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
      model: User,
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
      model: ResursCategory,
      key: "id",
    },
  },
});

ResursCategory.hasMany(Resurs, { foreignKey: "resursCategoryId" });
Resurs.belongsTo(ResursCategory, { foreignKey: "resursCategoryId" });

User.hasMany(Resurs, { foreignKey: "createdBy" });
Resurs.belongsTo(User, { foreignKey: "createdBy" });

export default Resurs;
