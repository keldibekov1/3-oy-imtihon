import jwt from "jsonwebtoken";
import Filial from "../models/filiallar.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

const isFaoliyatCreator = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret");

        // Agar admin bo‘lsa, to‘g‘ridan-to‘g‘ri o‘tish
        if (decoded.type === "admin") {
            return next();
        }

        // Foydalanuvchi ID si
        const userId = decoded.id;
        const { filialId } = req.body;

        if (!filialId) {
            return res.status(400).json({ message: "Filial ID berilishi kerak" });
        }

        // Filialni topish
        const filial = await Filial.findByPk(filialId);
        if (!filial) {
            return res.status(404).json({ message: "Filial topilmadi" });
        }

        const oquvMarkaz = await OquvMarkaz.findByPk(filial.oquvmarkazId);
        if (!oquvMarkaz) {
            return res.status(404).json({ message: "O‘quv markazi topilmadi" });
        }

        if (oquvMarkaz.userId !== userId) {
            return res.status(403).json({ message: "Siz faqat o‘zingiz yaratgan o‘quv markazining filiallari uchun faoliyat yaratishingiz mumkin" });
        }

        next(); // Keyingi bosqichga o‘tish
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Kirish mumkin emas" });
    }
};

export default isFaoliyatCreator;
