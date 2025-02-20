import ExcelJS from "exceljs";
import fs from "fs";
import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js"; // O‘quv markaz modeli

export const getOquvMarkazStudentsExcel = async (req, res) => {
  try {
    const { oquvmarkazId } = req.params;
    const userId = req.user.id; 
    const userType = req.user.type; 

    if (userType !== "admin") {
      const isOwner = await OquvMarkaz.findOne({
        where: { id: oquvmarkazId, createdBy: userId },
      });

      if (!isOwner) {
        return res.status(403).json({ message: "Siz bu o‘quv markazga ega emassiz!" });
      }
    }

    const students = await Reception.findAll({
      where: { oquvmarkazId },
      include: [{ model: User, attributes: ["id", "name", "surname", "phone", "email"] }],
    });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "O‘quvchilar topilmadi!" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("O‘quvchilar");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Ism", key: "name", width: 20 },
      { header: "Familiya", key: "surname", width: 20 },
      { header: "Telefon", key: "phone", width: 20 },
      { header: "Email", key: "email", width: 30 },
    ];

    students.forEach((student) => {
      if (student.User) {
        worksheet.addRow({
          id: student.User.id,
          name: student.User.name,
          surname: student.User.surname,
          phone: student.User.phone,
          email: student.User.email,
        });
      }
    });

    const filePath = `uploads/students_${oquvmarkazId}.xlsx`;
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, `students_${oquvmarkazId}.xlsx`, (err) => {
      if (err) {
        console.error("Faylni yuklashda xatolik:", err);
        res.status(500).json({ message: "Faylni yuklashda xatolik!" });
      }
      fs.unlinkSync(filePath); 
    });

  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
  }
};
