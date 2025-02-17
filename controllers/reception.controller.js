import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

// Foydalanuvchini kursga yozish
export const addReception = async (req, res) => {
  try {
    const { userId, oquvmarkazId } = req.body;

    // Foydalanuvchi yoki o'quv markazi mavjudligini tekshirish
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
    const receptions = await Reception.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ]
    });
    res.json(receptions);
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
