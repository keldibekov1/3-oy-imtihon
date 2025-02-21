import database from "../config/db.js";

const Region = database.define("Region", {
  id: {
    type: database.Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
});

export default Region;