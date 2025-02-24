import jwt from "jsonwebtoken";

const isSeoOwner = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret");

        if (decoded.type !== "seo" && decoded.type !== "admin") {
            return res.status(403).json({ message: "Bu sahifaga kirish huquqingiz yo'q" });
        }

        const userId = decoded.userId; 
        const centerOwnerId = req.params.ownerId;  

        if (userId !== centerOwnerId && decoded.type !== "admin") {
            return res.status(403).json({ message: "Siz faqat o'zingiz yaratgan o'quv markazini yangilashingiz mumkin" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Kirish mumkin emas" });
    }
};

export default isSeoOwner;
