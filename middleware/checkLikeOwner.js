import   UserLikes from "../models/userLikes.model.js"; 

const checkLikeOwner = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
        }

        const userId = req.user.id; 
        const { id } = req.params; 

        const like = await UserLikes.findByPk(id);
        if (!like) {
            return res.status(404).json({ message: "Like topilmadi" });
        }

        if (like.userId !== userId) {
            return res.status(403).json({ message: "Siz bu like'ni o‘chira olmaysiz" });
        }

        next(); 
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(500).json({ message: "Server xatosi: " + error.message });
    }
};

export default checkLikeOwner;
