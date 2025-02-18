import Resurs from "../models/resurs.model.js";
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
    const resurslar = await Resurs.findAll({
      include: [{ model: ResursCategory,attributes: ["name"] }],
    });
    res.json(resurslar);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
