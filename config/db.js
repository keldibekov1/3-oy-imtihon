import { Sequelize } from "sequelize";

const database = new Sequelize("n16", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default database;