import { Sequelize } from "sequelize";

const database = new Sequelize("n17", "root", "1212", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default database;