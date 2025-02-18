import Comment from "../models/comment.model.js";
import User from "../models/user.model.js"; // Foydalanuvchi modelini chaqiramiz

const selfComment = async (req, res, next) => {
  try {
    // Avtorizatsiya qilinmagan foydalanuvchi uchun
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
    }

    const { id } = req.params;
    const userEmail = req.user.email;
    const userType = req.user.type;

    // Kommentni user ma'lumotlari bilan birga olish
    const comment = await Comment.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["email"], // Faqat emailni olamiz
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: "Komment topilmadi" });
    }

    if (!comment.User || !comment.User.email) {
      return res.status(500).json({ message: "Kommentga tegishli foydalanuvchi topilmadi" });
    }

    // Agar admin bo‘lsa yoki foydalanuvchi o‘z kommentini o‘zgartirayotgan bo‘lsa, ruxsat beriladi
    if (userType === "admin" || comment.User.email === userEmail) {
      return next(); // Ruxsat berish
    }

    return res.status(403).json({ message: "Sizga bu amalni bajarishga ruxsat yo'q" });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export default selfComment;
