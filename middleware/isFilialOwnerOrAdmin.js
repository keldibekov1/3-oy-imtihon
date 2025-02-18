import jwt from "jsonwebtoken";
import Filial from "../models/filiallar.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

// Filialni yaratish, yangilash, o'chirish huquqini tekshiruvchi middleware
const isFilialOwnerOrAdmin = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret");

        // Foydalanuvchi 'seo' yoki 'admin' bo'lishi kerak
        if (decoded.type !== "seo" && decoded.type !== "admin") {
            return res.status(403).json({ message: "Bu sahifaga kirish huquqingiz yo'q" });
        }

        // Foydalanuvchining ID sini olish
        const userId = decoded.userId;

        // Filial ID ni olish
        const filialId = req.params.id; // 'id' parametrini olish
        console.log('Filial ID:', filialId); // Konsolga filialId ni chiqarish

        // Filial ID ni raqamga aylantirish
        const filialIdNum = parseInt(filialId, 10);

        if (isNaN(filialIdNum)) {
            return res.status(400).json({ message: "Noto'g'ri filial ID" });
        }

        // Filialni qidirish
        const filial = await Filial.findByPk(filialIdNum);

        if (!filial) {
            return res.status(404).json({ message: "Bu filial topilmadi" });
        }

        const oquvMarkazId = filial.oquvmarkazId;

        // O'quv markazining egasini tekshirish
        const oquvMarkaz = await OquvMarkaz.findByPk(oquvMarkazId);

        if (!oquvMarkaz) {
            return res.status(404).json({ message: "O'quv markazi topilmadi" });
        }

        // Foydalanuvchi o'zi yaratgan o'quv markaziga tegishli bo'lgan filialni boshqarishi mumkin
        if (oquvMarkaz.userId !== userId && decoded.type !== "admin") {
            return res.status(403).json({ message: "Siz faqat o'zingiz yaratgan o'quv markazining filiallarini boshqarishingiz mumkin" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Kirish mumkin emas" });
    }
};

export default isFilialOwnerOrAdmin;
