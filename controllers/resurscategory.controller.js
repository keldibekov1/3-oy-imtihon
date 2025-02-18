import ResursCategory from "../models/resursCategory.model.js";
import { Op } from "sequelize";

import Resurs from "../models/resurs.model.js";

// ✅ Kategoriya yaratish
export const createCategory = async (req, res) => {
  try {
    const { name, photo } = req.body;
    const newCategory = await ResursCategory.create({ name, photo });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Barcha kategoriyalarni olish
export const getAllCategories = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy = 'createdAt', filter } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const queryOptions = {
      limit,
      offset,
    };

    // Apply filter if provided (filter by name)
    if (filter) {
      queryOptions.where = {
        name: { [Op.like]: `%${filter}%` }
      };
    }

    // Apply sorting based on the 'sortBy' parameter
    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    const { rows, count } = await ResursCategory.findAndCountAll(queryOptions);

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

// ✅ Bitta kategoriyani olish va unga tegishli resurslarni chiqarish
export const getCategoryById = async (req, res) => {
  try {
    const category = await ResursCategory.findByPk(req.params.id, {
      include: [{ model: Resurs, attributes: ["name"]}],
    });

    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Kategoriyani yangilash
export const updateCategory = async (req, res) => {
  try {
    const { name, photo } = req.body;
    const category = await ResursCategory.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }

    category.name = name || category.name;
    category.photo = photo || category.photo;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Kategoriyani o‘chirish
export const deleteCategory = async (req, res) => {
  try {
    const category = await ResursCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }
    await category.destroy();
    res.json({ message: "Kategoriya o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
