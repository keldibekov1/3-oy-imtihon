import express from "express";
import authRouter from "./routes/user.routes.js";
import database from "./config/db.js";
import setupSwagger from "./config/swagger.js";
import uquvMarkazroute from "./routes/uquvMarkaz.routes.js";
import receptionRoutes from "./routes/reception.routes.js"
import resurscategory from "./routes/resursCategory.routes.js"
import resursRoute from "./routes/resurs.routes.js"
import commentRoute from "./routes/comment.routes.js"
import faoliyatRoute from "./routes/faoliyat.routes.js"
import filialRoute from "./routes/filial.routes.js"
import userLikeRoute from "./routes/userLikes.routes.js"
import yunalishRoute from "./routes/yunalish.routes.js"
import excelRoute from "./routes/excel.routes.js"





let PORT = 3000;
let app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/",uquvMarkazroute)
app.use("/", receptionRoutes)
app.use("/", resursRoute)
app.use("/",resurscategory)
app.use("/",commentRoute)
app.use("/",faoliyatRoute)
app.use("/",filialRoute)
app.use("/",userLikeRoute)
app.use("/", yunalishRoute)
app.use("/", excelRoute)

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
