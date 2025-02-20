import { Op } from "sequelize";
import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import sendSMS from "./sendSms.controller.js";
import { logger } from "../services/logger.js";

export const addReception = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      logger.warn("Kursga yozilish uchun avtorizatsiya talab qilinadi");
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
    }

    const userId = req.user.id;
    const { oquvmarkazId } = req.body;

    const user = await User.findByPk(userId);
    const oquvMarkaz = await OquvMarkaz.findByPk(oquvmarkazId, {
      include: [
          {
              model: User,
              as: 'creator', 
              attributes: ['id', 'name', 'phone'], 
          },
      ],
  });
  
  if (!user || !oquvMarkaz) {
    logger.warn(`Foydalanuvchi yoki Oquv markazi topilmadi: userId=${userId}, oquvmarkazId=${oquvmarkazId}`);
    return res.status(404).json({ message: "Foydalanuvchi yoki Oquv markazi topilmadi" });
  }
  const clientNum = oquvMarkaz.creator.dataValues.phone
  // console.log(oquvMarkaz.creator.dataValues.phone);

    const newReception = await Reception.create({ userId, oquvmarkazId });

// SMS YUBORISH HOZIRCHA UCHIQ 
    // sendSMS(clientNum)
    logger.info(`Foydalanuvchi kursga yozildi: receptionId=${newReception.id}, userId=${userId}, oquvmarkazId=${oquvmarkazId}`);
// QWERTYUIOASDFGHJSCVBNMASDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
    res.status(201).json(newReception);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllReceptions = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy, filter } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const queryOptions = {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] },
      ],
      limit,
      offset,
    };

    if (filter&&sortBy == "oquvmarkazId") {
      queryOptions.where = {
          [Op.and]: [
              { oquvmarkazId: { [Op.like]: `%${filter}%` } },
          ],
      };
  
  }
  if (filter&&sortBy == "userId") {
      queryOptions.where = {
          [Op.and]: [
              { userId: { [Op.like]: `%${filter}%` } },
          ],
      };
      
  }

    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    const { rows, count } = await Reception.findAndCountAll(queryOptions);

    const totalItems = count;
    const totalPages = Math.ceil(totalItems / limit);
    logger.info(`Barcha receptionlarni olish sorovi: page=${page}, size=${size}, sortBy=${sortBy}, filter=${filter}`);

    return res.status(200).json({
      message: "Success",
      data: rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: parseInt(page),
        pageSize: limit,
      },
    });
  } catch (error) {
    logger.error(`Receptionlarni olishda xatolik: ${error.message}`);
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};


export const getReceptionById = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ]
    });

    if (!reception) {
      logger.warn(`Reception topilmadi: id=${req.params.id}`);
      return res.status(404).json({ message: "Foydalanuvchi kursga yozilmagan" });
    }
    logger.info(`Reception topildi: id=${req.params.id}`);
    res.json(reception);
  } catch (error) {
    logger.error(`Receptionni olishda xatolik: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const updateReception = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id);

    if (!reception) {
      logger.warn(`Yangilashda reception topilmadi: id=${req.params.id}`);
      return res.status(404).json({ message: "Reception topilmadi" });
    }

    const { userId, oquvmarkazId } = req.body;

    if (userId !== undefined) {
      reception.userId = userId;
    }
    if (oquvmarkazId !== undefined) {
      reception.oquvmarkazId = oquvmarkazId;
    }

    await reception.save();
    logger.info(`Reception yangilandi: id=${req.params.id}, yangi userId=${userId}, yangi oquvmarkazId=${oquvmarkazId}`);


    res.json(reception);
  } catch (error) {
    logger.error(`Receptionni yangilashda xatolik: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};


export const deleteReception = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id);
    if (!reception) {
      logger.warn(`Ochirishda reception topilmadi: id=${req.params.id}`);
      return res.status(404).json({ message: "Reception topilmadi" });
    }
    await reception.destroy();
    logger.info(`Reception ochirildi: id=${req.params.id}`);
    res.status(200).json({ message: "Reception muvaffaqiyatli ochirildi" });
  } catch (error) {
    logger.error(`Receptionni ochirishda xatolik: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
