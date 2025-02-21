import { Sequelize } from "sequelize";

const database = new Sequelize("n2", "root", "1212", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "+05:00"
});

export default database;