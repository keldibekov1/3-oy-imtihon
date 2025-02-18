import Comment from "../models/comment.model.js";

// selfComment middleware
const selfComment = async (req, res, next) => {
  try {
    // Agar req.user mavjud bo'lmasa, tokenni dekodlashda xatolik bo'ldi
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
    }

    // `id`ni route parametrlaridan olish
    const { id } = req.params;
    const userEmail = req.user.email; // Token orqali foydalanuvchi emailini olish
    const userType = req.user.type;   // Token orqali foydalanuvchi turini olish

    // Kommentni topish
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Komment topilmadi" });
    }

    if (userType === "admin" || comment.authorEmail === userEmail) {
      return next(); // Keyingi middleware yoki route handlerga o'tish
    }

    return res.status(403).json({ message: "Siz bu huquq yoq" });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export default selfComment;
