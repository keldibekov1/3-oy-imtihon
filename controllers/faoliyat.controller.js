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
    const faoliyatlar = await Faoliyat.findAll({
      // Faoliyatlar bilan bog‘liq filial ma’lumotlarini ham olish
      include: [Filial], // Eslatma: Faoliyat va Filial o‘rtasidagi bog‘lanish `hasMany` bo‘lishi kerak
    });

    return res.status(200).json(faoliyatlar);
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
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
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
