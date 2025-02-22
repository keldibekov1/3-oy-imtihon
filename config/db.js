import { Sequelize } from "sequelize";

const database = new Sequelize("n17", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "+05:00",
  dialectOptions: {
    timezone: "+05:00", 
  },
});

export default database;