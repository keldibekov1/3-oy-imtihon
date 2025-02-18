import  Comment from "../models/comment.model.js";  
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import User from "../models/user.model.js";

// Comment yaratish
const createComment = async (req, res) => {
  try {
    const { userId, oquvmarkazId, star, desc } = req.body;

    const user = await User.findByPk(userId);
    const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
    }

    if (!oquvmarkaz) {
      return res.status(404).json({ message: "O‘quv markazi topilmadi." });
    }

    const newComment = await Comment.create({
      userId,
      oquvmarkazId,
      star,
      desc,
    });

    return res.status(201).json(newComment); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

// Barcha commentlarni olish
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ] 
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

    comment.star = star !== undefined ? star : comment.star;
    comment.desc = desc !== undefined ? desc : comment.desc;

    await comment.save();

    return res.status(200).json(comment);
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

    await comment.destroy();

    return res.status(200).json({ message: "Comment muvaffaqiyatli o'chirildi." });
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

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(OquvMarkaz, { foreignKey: "oquvmarkazId" });
