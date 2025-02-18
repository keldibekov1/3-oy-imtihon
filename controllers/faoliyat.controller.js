import Faoliyat  from "../models/faoliyat.model.js"; // Faoliyat modelini import qilish
import Filial from "../models/filiallar.model.js";
// Faoliyat yaratish
const createFaoliyat = async (req, res) => {
  try {
    const { type, name, photo, filialId } = req.body;

    // Yangi faoliyat yaratish
    const newFaoliyat = await Faoliyat.create({
      type,
      name,
      photo,
      filialId,
    });

    return res.status(201).json(newFaoliyat); // Yangi faoliyatni qaytarish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Barcha faoliyatlarni olish
const getAllFaoliyat = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const { rows, count } = await Faoliyat.findAndCountAll({
      include: [Filial], 
      limit,
      offset,
    });
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

// Faoliyatni yangilash
const updateFaoliyat = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, photo, filialId } = req.body;

    const faoliyat = await Faoliyat.findByPk(id);

    if (!faoliyat) {
      return res.status(404).json({ message: "Faoliyat topilmadi." });
    }

    // Faoliyatni yangilash
    faoliyat.type = type || faoliyat.type;
    faoliyat.name = name || faoliyat.name;
    faoliyat.photo = photo || faoliyat.photo;
    faoliyat.filialId = filialId || faoliyat.filialId;

    await faoliyat.save(); // O‘zgarishlarni saqlash

    return res.status(200).json(faoliyat); // Yangilangan faoliyatni qaytarish
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message});
  }
};

// Faoliyatni o‘chirish
const deleteFaoliyat = async (req, res) => {
  try {
    const { id } = req.params;

    const faoliyat = await Faoliyat.findByPk(id);

    if (!faoliyat) {
      return res.status(404).json({ message: "Faoliyat topilmadi." });
    }

    // Faoliyatni o‘chirish
    await faoliyat.destroy();

    return res.status(204).json(); // Muvaffaqiyatli o‘chirilganini bildirish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

export {
  createFaoliyat,
  getAllFaoliyat,
  updateFaoliyat,
  deleteFaoliyat,
};
Filial.belongsTo(Faoliyat);
Faoliyat.hasMany(Filial);
