import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

// Foydalanuvchini kursga yozish
export const addReception = async (req, res) => {
  try {
    const { userId, oquvmarkazId } = req.body;

    const user = await User.findByPk(userId);
    const oquvMarkaz = await OquvMarkaz.findByPk(oquvmarkazId);

    if (!user || !oquvMarkaz) {
      return res.status(404).json({ message: "Foydalanuvchi yoki Oquv markazi topilmadi" });
    }

    const newReception = await Reception.create({ userId, oquvmarkazId });
    res.status(201).json(newReception);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha yozilgan foydalanuvchilarni olish
export const getAllReceptions = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const { rows, count } = await Reception.findAndCountAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ],
      limit,
      offset,
    });
    const totalItems = count;  
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
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
    res.status(500).json({ message: error.message });
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
    const { userId, oquvmarkazId } = req.body;
    const reception = await Reception.findByPk(req.params.id);

    if (!reception) {
      return res.status(404).json({ message: "Reception topilmadi" });
    }

    reception.userId = userId;
    reception.oquvmarkazId = oquvmarkazId;
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
