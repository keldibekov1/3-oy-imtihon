import ExcelJS from "exceljs";
import path from "path";
import User from "../models/user.model.js";
import fs from "fs";

// Foydalanuvchilarni olish va Excel faylini yaratish funksiyasi
export const generateUserFile = async () => {
  try {
    // Barcha foydalanuvchilarni olish
    const users = await User.findAll();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Surname", key: "surname", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Type", key: "type", width: 30 },
      { header: "Status", key: "status", width: 30 },
    ];

    // Foydalanuvchilarni worksheetga qo'shish
    users.forEach(user => {
      worksheet.addRow({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        type: user.type,
        status: user.status
      });
    });

    // Faylni serverga saqlash
    const filePath = path.join("files", Math.random() + "users.xlsx");
    await workbook.xlsx.writeFile(filePath);

    return filePath; // Fayl manzilini qaytarish
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    throw new Error("Fayl yaratishda xatolik yuz berdi");
  }
};
