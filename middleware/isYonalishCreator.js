import jwt from "jsonwebtoken";
import Faoliyat from "../models/faoliyat.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

const isYonalishCreator = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret");

        if (decoded.type === "user") {
            return res.status(403).json({ message: "Bu amalni bajarish uchun sizda huquq yo'q" });
        }

        if (decoded.type === "admin") {
            return next();
        }

        // Foydalanuvchi ID si
        const userId = req.user.id;
        const { faoliyatId } = req.body;
        // console.log(faoliyatId);
        
        if (!faoliyatId) {
            return res.status(400).json({ message: "Faoliyat ID berilishi kerak" });
        }

        // Faoliyatni topish
        const faoliyat = await OquvMarkaz.findByPk(faoliyatId, {
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id"],
                },
            ],
        });

        if (!faoliyat) {
            return res.status(404).json({ message: "Faoliyat topilmadi" });
        }

        const userIdFromCreator = faoliyat.creator?.id;

        if (userIdFromCreator !== userId) {
            return res.status(403).json({ 
                message: "Siz faqat o‘zingiz yaratgan faoliyatga yo‘nalish qo‘shishingiz mumkin" 
            });
        }

        next(); // Keyingi bosqichga o‘tish
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Kirish mumkin emas" });
    }
};

export default isYonalishCreator;
