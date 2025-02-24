import { DataTypes } from "sequelize";
import database from "../config/db.js";
import User from "./user.model.js";
import Region from "./region.model.js";

const OquvMarkaz = database.define("OquvMarkaz", {
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
  regionId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Region,
      key: "id",
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.BIGINT,
    references: {
        model: User, 
        key: "id",
    },
    allowNull: false,
},
});

User.hasMany(OquvMarkaz, { foreignKey: "createdBy" });
OquvMarkaz.belongsTo(User, { as: "creator", foreignKey: "createdBy" });

Region.hasMany(OquvMarkaz, { foreignKey: "regionId" });
OquvMarkaz.belongsTo(Region, { as: "region", foreignKey: "regionId" });

export default OquvMarkaz;
