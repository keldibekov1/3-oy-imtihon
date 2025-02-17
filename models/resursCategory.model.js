import { DataTypes } from "sequelize";
import database from "../config/db.js";


const ResursCategory = database.define("resursCategory", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default ResursCategory;