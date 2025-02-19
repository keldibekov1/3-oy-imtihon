import jwt from "jsonwebtoken";
import Faoliyat from "../models/faoliyat.model.js";
import Filial from "../models/filiallar.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

const isFaoliyatOwner = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret");

        if (decoded.type === "admin") {
            return next();
        }

        const userId = decoded.id;
        const { id } = req.params; 

        const faoliyat = await Faoliyat.findByPk(id);
        if (!faoliyat) {
            return res.status(404).json({ message: "Faoliyat topilmadi" });
        }

        const filial = await Filial.findByPk(faoliyat.filialId);
        if (!filial) {
            return res.status(404).json({ message: "Filial topilmadi" });
        }

        const oquvMarkaz = await OquvMarkaz.findByPk(filial.oquvmarkazId);
        if (!oquvMarkaz) {
            return res.status(404).json({ message: "O‘quv markazi topilmadi" });
        }

        if (oquvMarkaz.userId !== userId) {
            return res.status(403).json({ message: "Siz faqat o‘zingiz yaratgan o‘quv markazining faoliyatlarini boshqarishingiz mumkin" });
        }

        next(); // Keyingi bosqichga o‘tish
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Kirish mumkin emas" });
    }
};

export default isFaoliyatOwner;
