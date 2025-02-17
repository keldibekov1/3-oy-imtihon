import Filial  from "../models/filiallar.model.js"; // Filial va OquvMarkaz modellari import qilinadi
import OquvMarkaz from "../models/uquvMarkaz.model.js"
// Filial yaratish
const createFilial = async (req, res) => {
  try {
    const { name, photo, region, phone, address, oquvmarkazId } = req.body;

    // O‘quv markazi mavjudligini tekshirish
    const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);

    if (!oquvmarkaz) {
      return res.status(404).json({ message: "O‘quv markazi topilmadi." });
    }

    // Yangi filial yaratish
    const newFilial = await Filial.create({
      name,
      photo,
      region,
      phone,
      address,
      oquvmarkazId,
    });

    return res.status(201).json(newFilial); // Yangi filialni qaytarish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Barcha filiallarni olish
const getAllFiliallar = async (req, res) => {
  try {
    const filiallar = await Filial.findAll({
      include: ["OquvMarkaz"], // Filial va uning tegishli O‘quv Markazi bilan birga olish
    });

    return res.status(200).json(filiallar); // Filiallar ro‘yxatini qaytarish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Filialni yangilash
const updateFilial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, photo, region, phone, address, oquvmarkazId } = req.body;

    const filial = await Filial.findByPk(id);

    if (!filial) {
      return res.status(404).json({ message: "Filial topilmadi." });
    }

    // Filialni yangilash
    filial.name = name || filial.name;
    filial.photo = photo || filial.photo;
    filial.region = region || filial.region;
    filial.phone = phone || filial.phone;
    filial.address = address || filial.address;
    filial.oquvmarkazId = oquvmarkazId || filial.oquvmarkazId;

    await filial.save(); // O‘zgarishlarni saqlash

    return res.status(200).json(filial); // Yangilangan filialni qaytarish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Filialni o‘chirish
const deleteFilial = async (req, res) => {
  try {
    const { id } = req.params;

    const filial = await Filial.findByPk(id);

    if (!filial) {
      return res.status(404).json({ message: "Filial topilmadi." });
    }

    // Filialni o‘chirish
    await filial.destroy();

    return res.status(204).json(); // Muvaffaqiyatli o‘chirilganini bildirish
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

export {
  createFilial,
  getAllFiliallar,
  updateFilial,
  deleteFilial,
};
