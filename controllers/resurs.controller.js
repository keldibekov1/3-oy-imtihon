import Resurs from "../models/resurs.model.js";
import ResursCategory from "../models/resursCategory.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";


export const createResurs = async (req, res) => {
  try {
      if (!req.user || !req.user.id) {
          return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
      }

      const { name, media, description, photo, resursCategoryId } = req.body;
      const createdBy = req.user.id; // JWT dan foydalanuvchi ID ni olish

      const category = await ResursCategory.findByPk(resursCategoryId);
      if (!category) {
          return res.status(404).json({ message: "Kategoriya topilmadi" });
      }

      const newResurs = await Resurs.create({ name, media, description, photo, createdBy, resursCategoryId });

      res.status(201).json({ message: "Resurs muvaffaqiyatli yaratildi", data: newResurs });
  } catch (error) {
      console.error("Server xatosi:", error);
      res.status(500).json({ message: "Serverda xatolik yuz berdi: " + error.message });
  }
};

  

export const getAllResurs = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy, filter } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const queryOptions = {
      include: [
        {
          model: ResursCategory,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["name", "surname", "email"], // Faqat kerakli maydonlarni chaqiramiz
        },
      ],
      limit,
      offset,
    };

    // **Filter qo‘shish**
    if (filter) {
      queryOptions.where = {};
      
      if (sortBy === "name") {
        queryOptions.where.name = { [Op.like]: `%${filter}%` };
      } else if (sortBy === "category") {
        queryOptions.include[0].where = { name: { [Op.like]: `%${filter}%` } };
      }
    }

    // **Tartiblash qo‘shish**
    if (sortBy) {
      if (sortBy === "category") {
        queryOptions.order = [[ResursCategory, "name", "ASC"]];
      } else {
        queryOptions.order = [[sortBy, "ASC"]];
      }
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
    console.error(error.message);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};




export const getResursById = async (req, res) => {
  try {
    const resurs = await Resurs.findByPk(req.params.id, {
      include: [
        {
          model: ResursCategory,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["name", "surname", "email"], // Faqat kerakli maydonlarni chaqiramiz
        },
      ],
    });

    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }

    res.json(resurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateResurs = async (req, res) => {
  try {
    const { name, media, description, photo, resursCategoryId } = req.body;
    const resurs = await Resurs.findByPk(req.params.id);

    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }
    const category = await ResursCategory.findByPk(resursCategoryId);
      if (!category) {
          return res.status(404).json({ message: "Kategoriya topilmadi" });
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
