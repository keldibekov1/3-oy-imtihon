import { DataTypes } from "sequelize";
import database from "../config/db.js";
import ResursCategory from "./resursCategory.model.js";
import User from "./user.model.js";

const Resurs = database.define("resurs", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    medida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desciription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    resursCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ResursCategory,
            key: "id"
        }
    }
}, {timestamps: true})


User.hasMany(Resurs, { foreignKey: "userId" });
Resurs.belongsTo(User, { foreignKey: "userId" });

ResursCategory.hasMany(Resurs, { foreignKey: "resursCategoryId" });
Resurs.belongsTo(ResursCategory, { foreignKey: "resursCategoryId" });

export default Resurs;