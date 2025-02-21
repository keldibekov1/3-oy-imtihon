import { Sequelize } from "sequelize";

const database = new Sequelize("n17", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default database;