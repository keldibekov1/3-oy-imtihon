const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserLikes = sequelize.define("UserLikes", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: "User",
      key: "id",
    },
  },
  oquvmarkazId: {
    type: DataTypes.BIGINT,
    references: {
      model: "OquvMarkaz",
      key: "id",
    },
  },
});

export default UserLikes;
