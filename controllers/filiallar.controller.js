import { Op } from "sequelize";
import Filial  from "../models/filiallar.model.js"; // Filial va OquvMarkaz modellari import qilinadi
import OquvMarkaz from "../models/uquvMarkaz.model.js"
import { logger } from "../services/logger.js";
// Filial yaratish
const createFilial = async (req, res) => {
  try {
    const { name, photo, region, phone, address, oquvmarkazId } = req.body;
    const userId = req.user?.id || "Unknown";
    logger.info("Filial yaratish sorovi", { userId, name, oquvmarkazId });
    const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);

    if (!oquvmarkaz) {
      logger.warn(`Filial qoshishda Oquv markazi topilmadi: oquvmarkazId=${oquvmarkazId}`);
      return res.status(404).json({ message: "Oquv markazi topilmadi." });
    }

    const newFilial = await Filial.create({
      name,
      photo,
      region,
      phone,
      address,
      oquvmarkazId,
    });
    logger.info(`Yangi filial yaratildi: id=${newFilial.id}, name=${newFilial.name}`);
    return res.status(201).json(newFilial);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};


// Barcha filiallarni olish

const getAllFiliallar = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy, filter } = req.query;

    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    // Default query options for pagination and inclusion
    const queryOptions = {
      include: [OquvMarkaz],
      limit,
      offset,
    };

    // Apply filter if provided
    if (filter && sortBy) {
      queryOptions.where = {};
  
      if (sortBy === "name") {
          queryOptions.where.name = { [Op.like]: `%${filter}%` };
      }
  
      if (sortBy === "region") {
          queryOptions.where.region = { [Op.like]: `%${filter}%` };
      }
  }

    // Apply sorting if provided
    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    // Fetching the data from the database
    const { rows, count } = await Filial.findAndCountAll(queryOptions);
    const totalItems = count;
    const totalPages = Math.ceil(totalItems / limit);
    logger.info(`Filiallar royxati sorovi: page=${page}, size=${size}, sortBy=${sortBy}, filter=${filter}`);

    // Return success response with pagination
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

    const filial = await Filial.findByPk(id);

    if (!filial) {
      logger.warn(`Yangilashda filial topilmadi: id=${id}`);
      return res.status(404).json({ message: "Filial topilmadi." });
    }

    // Faqat mavjud maydonlarni yangilash
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        filial[key] = updates[key];
      }
    });

    await filial.save(); // Ozgarishlarni saqlash
    logger.info(`Filial yangilandi: id=${id}, yangilangan maydonlar=${JSON.stringify(updates)}`);

    return res.status(200).json(filial); // Yangilangan filialni qaytarish
  } catch (error) {
    logger.error(`Filialni yangilashda xatolik: ${error.message}`);
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};


// Filialni ochirish
const deleteFilial = async (req, res) => {
  try {
    const { id } = req.params;

    const filial = await Filial.findByPk(id);

    if (!filial) {
      logger.warn(`Ochirishda filial topilmadi: id=${id}`);
      return res.status(404).json({ message: "Filial topilmadi." });
    }

    // Filialni ochirish
    await filial.destroy();
    logger.info(`Filial ochirildi: id=${id}`);

    return res.status(200).json({msg: "O'chirildi"}); // Muvaffaqiyatli ochirilganini bildirish
  } catch (error) {
    logger.error("Filial ochirishda xatolik", { error: error.message });
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
