import express from "express";
import authRouter from "./routes/user.routes.js";
import database from "./config/db.js";
import setupSwagger from "./config/swagger.js";


let PORT = 3000;
let app = express();

app.use(express.json());

app.use("/auth", authRouter);


setupSwagger(app);

async function bootstaprt() {
  try {
    await database.sync(
    //  { force: true }
      
    );
    console.log("Connect to db");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
bootstaprt();
