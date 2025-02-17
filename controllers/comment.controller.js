import  Comment from "../models/comment.model.js";  
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import User from "../models/user.model.js";

// Comment yaratish
const createComment = async (req, res) => {
  try {
    const { userId, oquvmarkazId, star, desc } = req.body;

    // Foydalanuvchi va o‘quv markazi mavjudligini tekshirish
    const user = await User.findByPk(userId);
    const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);

    if (!user || !oquvmarkaz) {
      return res.status(404).json({ message: "Foydalanuvchi yoki o‘quv markazi topilmadi." });
    }

    // Yangi comment yaratish
    const newComment = await Comment.create({
      userId,
      oquvmarkazId,
      star,
      desc,
    });

    return res.status(201).json(newComment); // Yangi commentni qaytarish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

// Barcha commentlarni olish
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [User, OquvMarkaz], // Foydalanuvchi va o‘quv markazi bilan birga olish
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { star, desc } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment topilmadi." });
    }

    // Commentni yangilash
    comment.star = star || comment.star;
    comment.desc = desc || comment.desc;

    await comment.save(); // O‘zgarishlarni saqlash

    return res.status(200).json(comment); // Yangilangan commentni qaytarish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

// Commentni o‘chirish
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment topilmadi." });
    }

    // Commentni o‘chirish
    await comment.destroy();

    return res.status(204).json(); // Muvaffaqiyatli o‘chirilganini bildirish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

export {
    createComment,
    getAllComments,
    updateComment,
    deleteComment,
};
