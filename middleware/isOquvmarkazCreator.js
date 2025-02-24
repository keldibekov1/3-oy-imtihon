import jwt from "jsonwebtoken";
import Filial from "../models/filiallar.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import User from "../models/user.model.js";
const isOquvmarkazCreator = async (req, res, next) => {
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
        const userId = decoded.id;
        const { oquvmarkazId } = req.body;
        console.log(oquvmarkazId);
        
        if (!oquvmarkazId) {
            return res.status(400).json({ message: "OquvmarkazId ID berilishi kerak" });
        }

        // Filialni topish
        const oquvmarkaz = await OquvMarkaz.findByPk(oquvmarkazId);
        if (!oquvmarkaz) {
            return res.status(404).json({ message: "Filial topilmadi" });
        }

        const oquvMarkaz = await OquvMarkaz.findByPk(oquvmarkazId, {
            include: [
                {
                    model: User,
            as: "creator", // Use the alias defined in the association
            attributes: ["id"], // Fetch only the userId (id in User model)
                },
            ],
        });
        
        if (!oquvMarkaz) {
            return res.status(404).json({ message: "O‘quv markazi topilmadi" });
        }
                
        const userIdFromCreator = oquvMarkaz.creator?.id;
        
        if (userIdFromCreator !== userId) {
            console.log("O‘quv Markaz Creator ID:", userIdFromCreator);
        
            return res.status(403).json({ 
                message: "Siz faqat o‘zingiz yaratgan o‘quv markazingiz uchun faoliyat yaratishingiz mumkin" 
            });
        }
        

        next(); // Keyingi bosqichga o‘tish
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: error.message });
    }
};

export default isOquvmarkazCreator;
