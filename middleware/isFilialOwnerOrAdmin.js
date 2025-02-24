import Filial from "../models/faoliyat.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

const isFilialOwnerOrAdmin = async (req, res, next) => {
  try {
    const { filialId } = req.params;
    const userId = req.user.id;
    const userType = req.user.type;

    if (userType === "admin") return next();

    const filial = await Filial.findByPk(filialId, {
      include: { model: OquvMarkaz, as: "oquvMarkaz" },
    });

    if (!filial) {
      return res.status(404).json({ message: "Filial topilmadi" });
    }

    if (filial.oquvMarkaz.createdBy === userId) {
      return next();
    }

    return res.status(403).json({ 
      message: `Siz bu filialni o‘zgartira olmaysiz. Filial egasi: ${filial.oquvMarkaz.createdBy}` 
    });

  } catch (error) {
    res.status(500).json({ message: "Server xatosi" });
  }
};

export default isFilialOwnerOrAdmin;
