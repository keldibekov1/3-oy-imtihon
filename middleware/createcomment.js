import Comment from "../models/comment.model.js";  
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import User from "../models/user.model.js";

const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oquvmarkazId, star, desc } = req.body;

    const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);
    if (!oquvmarkaz) {
      return res.status(404).json({ message: "O‘quv markazi topilmadi." });
    }

    const newComment = await Comment.create({
      userId,
      oquvmarkazId,
      star,
      desc,
    });

    return res.status(201).json({ message: "Comment qo‘shildi!", data: newComment }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

export { createComment };
