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
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import User from "./models/user.model.js";




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

app.get("/save-users", async (req, res) => {
  try {
    const users = await User.findAll();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Surname", key: "surname", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 30 },
      { header: "Status", key: "status", width: 30 },
    ];

    users.forEach(user => {
      worksheet.addRow({
        id: user.id,
        name: user.name,
        surname: user.surname, // username emas, surname kerak
        email: user.email,
        role: user.role,
        status: user.status
      });
    });
    

    // Faylni saqlash
    const filePath = path.join("files", Math.random() + "users.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.json({ message: "Fayl muvaffaqiyatli saqlandi", filePath });
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    res.status(500).send("Server xatosi");
  }
});

// Saqlangan faylni yuklab olish
app.get("/download-users", (req, res) => {
  const filePath = path.join("files", "users.xlsx");
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else { 
    res.status(404).send("Fayl topilmadi");
  }
});


bootstaprt();
