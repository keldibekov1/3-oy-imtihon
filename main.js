import express from "express";
import authRouter from "./routes/user.routes.js";
import database from "./config/db.js";
import setupSwagger from "./config/swagger.js";
import mainRoute from "./routes/index.js";
import uquvMarkazroute from "./routes/uquvMarkaz.routes.js";
import receptionRoutes from "./routes/reception.routes.js"
import resurscategory from "./routes/resursCategory.routes.js"
import resursRoute from "./routes/resurs.routes.js"




let PORT = 3000;
let app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("api", mainRoute);
app.use("/uquvmarkaz",uquvMarkazroute)
app.use("/", receptionRoutes)
app.use("/", resursRoute)
app.use("/",resurscategory)

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
