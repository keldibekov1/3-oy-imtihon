import { Sequelize } from "sequelize";

const database = new Sequelize("n17", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default database;