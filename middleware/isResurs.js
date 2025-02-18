import Resurs from "../models/resurs.model.js";
import User from "../models/user.model.js"; // Agar foydalanuvchi modelini chaqirish zarur bo'lsa

const isResurs = async (req, res, next) => {
  try {
    const { id } = req.params; // Resurs ID
    const userId = req.user.id; // Token orqali olingan foydalanuvchi ID (req.user shartli bo'lishi kerak)

    const resurs = await Resurs.findByPk(id);

    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }

    // Resursni faqat o'zini yaratgan foydalanuvchi yoki admin o'chirishi mumkin
    if (resurs.createdBy !== userId && req.user.type !== "admin") {
      return res.status(403).json({ message: "Siz bu resursni o'chira olmaysiz" });
    }

    // Middleware orqali keyingi funksiyaga o'tish
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
};

export default isResurs;
