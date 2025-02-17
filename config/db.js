import { Sequelize } from "sequelize";

const database = new Sequelize("n16", "root", "5779", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default database;