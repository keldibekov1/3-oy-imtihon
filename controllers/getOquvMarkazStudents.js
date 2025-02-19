import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";

export const getOquvMarkazStudents = async (req, res) => {
  try {
    const { oquvmarkazId } = req.params; // URL dan o‘quv markaz ID olamiz

    // Foydalanuvchi faqat o‘zining markazi uchun so‘rov yubora olishi kerak
    if (req.user.type !== "admin" && req.user.oquvmarkazId !== Number(oquvmarkazId)) {
      return res.status(403).json({ message: "Sizga bu ma'lumotlarni ko'rish taqiqlangan!" });
    }

    const students = await Reception.findAll({
      where: { oquvmarkazId },
      include: [{ model: User, attributes: ["id", "name", "surname", "phone", "email"] }],
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
  }
};
