import { Op } from "sequelize";
import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import sendSMS from "./sendSms.controller.js";

// Foydalanuvchini kursga yozish
export const addReception = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
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
    return res.status(404).json({ message: "Foydalanuvchi yoki Oquv markazi topilmadi" });
  }
  const clientNum = oquvMarkaz.creator.dataValues.phone
  // console.log(oquvMarkaz.creator.dataValues.phone);

    const newReception = await Reception.create({ userId, oquvmarkazId });

// SMS YUBORISH HOZIRCHA UCHIQ 
    sendSMS(clientNum)
// QWERTYUIOASDFGHJSCVBNMASDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
    res.status(201).json(newReception);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha yozilgan foydalanuvchilarni olish

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

    // Apply sorting based on the 'sortBy' parameter
    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    const { rows, count } = await Reception.findAndCountAll(queryOptions);

    const totalItems = count;
    const totalPages = Math.ceil(totalItems / limit);

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
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};


// Bitta foydalanuvchining kursga yozilganligini ko'rish
export const getReceptionById = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ]
    });

    if (!reception) {
      return res.status(404).json({ message: "Foydalanuvchi kursga yozilmagan" });
    }

    res.json(reception);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Foydalanuvchini boshqa kursga yozish (yangilash)
export const updateReception = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id);

    if (!reception) {
      return res.status(404).json({ message: "Reception topilmadi" });
    }

    // Faqat mavjud bo'lgan maydonlarni yangilash
    const { userId, oquvmarkazId } = req.body;

    if (userId !== undefined) {
      reception.userId = userId;
    }
    if (oquvmarkazId !== undefined) {
      reception.oquvmarkazId = oquvmarkazId;
    }

    await reception.save();


    res.json(reception);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Foydalanuvchini kursdan o‘chirish
export const deleteReception = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id);
    if (!reception) {
      return res.status(404).json({ message: "Reception topilmadi" });
    }
    await reception.destroy();
    res.json({ message: "Reception muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
