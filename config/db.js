import { Sequelize } from "sequelize";

const database = new Sequelize("n16", "root", "1212", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default database;