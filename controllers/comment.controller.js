import Comment from "../models/comment.model.js";  
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import User from "../models/user.model.js";
import {logger} from "../services/logger.js";


// Comment yaratish
const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      logger.warn("Foydalanuvchi ID topilmadi. Avtorizatsiya talab qilinadi.");
      return res.status(401).json({ message: "Foydalanuvchi ID topilmadi. Iltimos, avtorizatsiya qiling." });
    }

    const { oquvmarkazId, star, desc } = req.body;
    logger.info(`Yangi comment yaratish urinish: userId=${userId}, oquvmarkazId=${oquvmarkazId}`);

    const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);
    if (!oquvmarkaz) {
      logger.warn(`Oquv markazi topilmadi: ID=${oquvmarkazId}`);
      return res.status(404).json({ message: "Oquv markazi topilmadi." });
    }

    const newComment = await Comment.create({ userId, oquvmarkazId, star, desc });
    logger.info(`Comment yaratildi: ID=${newComment.id}`);

    return res.status(201).json(newComment);
  } catch (error) {
    logger.error(`Comment yaratishda xatolik: ${error.message}`);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

// Barcha commentlarni olish
const getAllComments = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    logger.info(`Commentlar royxati sorovi: page=${page}, size=${size}`);

    const { rows, count } = await Comment.findAndCountAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ],
      limit,
      offset,
    });

    logger.info(`Jami commentlar: ${count}`);

    return res.status(200).json({
      message: "Success",
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        pageSize: limit,
      },
    });
  } catch (error) {
    logger.error(`Commentlarni olishda xatolik: ${error.message}`);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { star, desc } = req.body;
    logger.info(`Comment yangilash urinish: ID=${id}`);

    const comment = await Comment.findByPk(id);
    if (!comment) {
      logger.warn(`Comment topilmadi: ID=${id}`);
      return res.status(404).json({ message: "Comment topilmadi." });
    }

    comment.star = star !== undefined ? star : comment.star;
    comment.desc = desc !== undefined ? desc : comment.desc;
    await comment.save();

    logger.info(`Comment yangilandi: ID=${id}`);
    return res.status(200).json(comment);
  } catch (error) {
    logger.error(`Commentni yangilashda xatolik: ${error.message}`);
    return res.status(500).json({ message: `Serverda xatolik yuz berdi: ${error.message}` });
  }
};

// Commentni ochirish
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Comment ochirish urinish: ID=${id}`);

    const comment = await Comment.findByPk(id);
    if (!comment) {
      logger.warn(`Comment topilmadi: ID=${id}`);
      return res.status(404).json({ message: "Comment topilmadi." });
    }

    await comment.destroy();
    logger.info(`Comment ochirildi: ID=${id}`);

    return res.status(200).json({ message: "Comment muvaffaqiyatli o'chirildi." });
  } catch (error) {
    logger.error(`Commentni ochirishda xatolik: ${error.message}`);
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
