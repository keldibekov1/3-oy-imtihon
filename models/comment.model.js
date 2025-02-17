import database from "../config/db.js";
import { DataTypes}  from "sequelize"

const Comment = database.define("comment", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    desciription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oquvmarkazId: {
        
    }
    
}, {timestamps: true})

export default Comment;