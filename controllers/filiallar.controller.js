import { Op } from "sequelize";
import Filial  from "../models/filiallar.model.js"; 
import OquvMarkaz from "../models/uquvMarkaz.model.js"
import { logger } from "../services/logger.js";

const createFilial = async (req, res) => {
  try {
    const { name, region, phone, address, oquvmarkazId } = req.body;
    const userId = req.user.id;
    const userType = req.user.type; 

    if (userType === "user") {
      return res.status(403).json({ message: "Bu amalni bajarish uchun sizda huquq yo'q" });
  }

    const existingFilial = await Filial.findOne({ where: { phone } });
    if (existingFilial) {
      return res.status(400).json({ message: "Bu telefon raqam allaqachon band" });
    }

    let oquvMarkaz;

    if (userType !== "admin") {
      oquvMarkaz = await OquvMarkaz.findOne({
        where: { id: oquvmarkazId, createdBy: userId },
      });

      if (!oquvMarkaz) {
        return res.status(403).json({ message: "Bu o‘quv markazga filial qo‘sha olmaysiz" });
      }
    } else {
      oquvMarkaz = await OquvMarkaz.findByPk(oquvmarkazId);
      if (!oquvMarkaz) {
        return res.status(404).json({ message: "O‘quv markaz topilmadi" });
      }
    }

    const newFilial = await Filial.create({
      name,
      region,
      phone,
      address,
      oquvmarkazId,
    });

    res.status(201).json({ message: "Filial muvaffaqiyatli qo‘shildi", filial: newFilial });
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
  }
};




const getAllFiliallar = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy, filter } = req.query;

    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const queryOptions = {
      include: [
        {
          model: OquvMarkaz,
          as: "oquvMarkaz", 
        },
      ],
      limit,
      offset,
    };

    if (filter && sortBy) {
      queryOptions.where = {};
  
      if (sortBy === "name") {
          queryOptions.where.name = { [Op.like]: `%${filter}%` };
      }
  
      if (sortBy === "region") {
          queryOptions.where.region = { [Op.like]: `%${filter}%` };
      }
    }

    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    const { rows, count } = await Filial.findAndCountAll(queryOptions);
    const totalItems = count;
    const totalPages = Math.ceil(totalItems / limit);
    logger.info(`Filiallar royxati sorovi: page=${page}, size=${size}, sortBy=${sortBy}, filter=${filter}`);

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
    logger.error("Filiallarni olishda xatolik", { error: error.message });
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

const updateFilial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;
    const userType = req.user.type;

    if (userType === "user") {
      return res.status(403).json({ message: "Bu amalni bajarish uchun sizda huquq yo'q" });
  }

    const filial = await Filial.findByPk(id, {
      include: {
        model: OquvMarkaz,
        as: "oquvMarkaz",
      },
    });

    if (!filial) {
      return res.status(404).json({ message: "Filial topilmadi." });
    }

    if (filial.oquvMarkaz.createdBy !== userId && userType !== "admin") {
      return res.status(403).json({ message: "Siz faqat o'zingiz yaratgan filiallarni o'zgartira olasiz" });
    }

    if (updates.phone && updates.phone !== filial.phone) {
      const existingFilial = await Filial.findOne({ where: { phone: updates.phone } });
      if (existingFilial) {
        return res.status(400).json({ message: "Bu telefon raqami boshqa filialda mavjud" });
      }
    }

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        filial[key] = updates[key];
      }
    });

    await filial.save();
    return res.status(200).json(filial);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};


// Filialni o‘chirish
const deleteFilial = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; 
    const userType = req.user.type; 
    if (userType === "user") {
      return res.status(403).json({ message: "Bu amalni bajarish uchun sizda huquq yo'q" });
  }
    const filial = await Filial.findByPk(id, {
      include: {
        model: OquvMarkaz,
        as: "oquvMarkaz",
      },
    });

    if (!filial) {
      logger.warn(`Ochirishda filial topilmadi: id=${id}`);
      return res.status(404).json({ message: "Filial topilmadi." });
    }

    if (filial.oquvMarkaz.createdBy !== userId && userType !== "admin") {
      return res.status(403).json({ message: "Siz faqat o'zingiz yaratgan filiallarni o'chira olasiz" });
    }

    await filial.destroy();
    logger.info(`Filial o‘chirildi: id=${id}`);

    return res.status(200).json({ message: "Filial muvaffaqiyatli o'chirildi." });
  } catch (error) {
    logger.error("Filial o'chirishda xatolik", { error: error.message });
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
