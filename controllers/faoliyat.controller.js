import Faoliyat  from "../models/faoliyat.model.js"; // Faoliyat modelini import qilish
import Filial from "../models/filiallar.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";
// Faoliyat yaratish
const createFaoliyat = async (req, res) => {
  try {
    const { type, name, photo, oquvmarkazId } = req.body;

    let oquvMarkaz = await OquvMarkaz.findByPk(oquvmarkazId);
    if(!oquvMarkaz){
      return res.status(404).send({message:"oquv markaz topilmadi"})
    }
    const newFaoliyat = await Faoliyat.create({
      type,
      name,
      photo,
      oquvmarkazId,
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

const updateFaoliyat = async (req, res) => {
  try {
    const { id } = req.params; // URL-dan ID olish
    const  updates  = req.body; // Body-dan yangilanish ma'lumotlarini olish
    
    // Faoliyatni tekshirish
    const faoliyat = await Faoliyat.findByPk(id);
    if (!faoliyat) {
      return res.status(404).json({ message: "Faoliyat topilmadi." });
    }

    // O'quv markazni tekshirish (agar oquvmarkazId mavjud bo'lsa)
    if (updates.oquvmarkazId) {
      const oquvMarkaz = await OquvMarkaz.findByPk(updates.oquvmarkazId);
      if (!oquvMarkaz) {
        return res.status(404).send({ message: "O'quv markaz topilmadi." });
      }
    }

    // Faoliyatni yangilash
    const [updatedRowCount] = await Faoliyat.update(updates, {
      where: { id },
    });

    if (updatedRowCount === 0) {
      return res.status(400).json({ message: "Faoliyat yangilanmadi." });
    }

    // Yangilangan yozuvni qayta olish
    const updatedFaoliyat = await Faoliyat.findByPk(id);

    res.status(200).json({
      message: "Faoliyat muvaffaqiyatli yangilandi.",
      data: updatedFaoliyat, 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
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

    return res.status(201).json({message:"malumot uchirildi"}); // Muvaffaqiyatli o‘chirilganini bildirish
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

