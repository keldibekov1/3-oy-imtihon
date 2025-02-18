import Resurs from "../models/resurs.model.js";
import { Op } from "sequelize";

import ResursCategory from "../models/resursCategory.model.js";

// ✅ Resurs yaratish
export const createResurs = async (req, res) => {
    try {
      const { name, media, description, photo, createdBy, resursCategoryId } = req.body; // name o‘rniga name ishlatildi
  
      const category = await ResursCategory.findByPk(resursCategoryId);
      if (!category) {
        return res.status(404).json({ message: "Kategoriya topilmadi" });
      }
  
      const newResurs = await Resurs.create({ name, media, description, photo, createdBy, resursCategoryId }); // name emas, name ishlatilishi kerak!
      
      res.status(201).json(newResurs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// ✅ Barcha resurslarni olish
export const getAllResurs = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy = 'createdAt', filter } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const queryOptions = {
      include: [
        { model: ResursCategory, attributes: ["name"] }
      ],
      limit,
      offset,
    };

    // Apply filter if provided (filter by name or category)
    if (filter) {
      queryOptions.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${filter}%` } },
          { category: { [Op.like]: `%${filter}%` } }
        ],
      };
    }

    // Apply sorting based on the 'sortBy' parameter
    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    const { rows, count } = await Resurs.findAndCountAll(queryOptions);

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



// ✅ Bitta resursni olish
export const getResursById = async (req, res) => {
  try {
    const resurs = await Resurs.findByPk(req.params.id, {
      include: [{ model: ResursCategory, attributes: ["name"] }],
    });

    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }

    res.json(resurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Resursni yangilash
export const updateResurs = async (req, res) => {
  try {
    const { name, media, description, photo, resursCategoryId } = req.body;
    const resurs = await Resurs.findByPk(req.params.id);

    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }

    resurs.name = name || resurs.name;
    resurs.media = media || resurs.media;
    resurs.description = description || resurs.description;
    resurs.photo = photo || resurs.photo;
    resurs.resursCategoryId = resursCategoryId || resurs.resursCategoryId;

    await resurs.save();
    res.json(resurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Resursni o‘chirish
export const deleteResurs = async (req, res) => {
  try {
    const resurs = await Resurs.findByPk(req.params.id);
    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }
    await resurs.destroy();
    res.json({ message: "Resurs ochirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
