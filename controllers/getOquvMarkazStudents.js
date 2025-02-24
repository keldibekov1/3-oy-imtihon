import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js"; 

import { Op } from "sequelize";


export const getOquvMarkazStudents = async (req, res) => {
  try {
    const { oquvmarkazId } = req.params;
    const userId = req.user.id; 
    const userType = req.user.type; 

    if (userType === "admin") {
      const students = await fetchStudents(oquvmarkazId);
      return res.status(200).json(students);
    }

    const isOwner = await OquvMarkaz.findOne({
      where: { id: oquvmarkazId, createdBy: userId }, 
    });

    if (!isOwner) {
      return res.status(403).json({ message: "Siz bu o‘quv markazga ega emassiz!" });
    }

    const students = await fetchStudents(oquvmarkazId);
    return res.status(200).json(students);

  } catch (error) {
    console.error("Xatolik:", error);
    return res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
  }
};

const fetchStudents = async (oquvmarkazId) => {
  return await Reception.findAll({
    where: { oquvmarkazId },
    include: [
      {
        model: User,
        attributes: ["id", "name", "surname", "phone", "email"],
        where: { status: { [Op.ne]: "pending" } },
      },
    ],
  });
};