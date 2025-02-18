import jwt from "jsonwebtoken";

const isSeo = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret");
        if (decoded.type !== "seo" || decoded.type !== "admin") {
            return res.status(403).json({ message: "Bu sahifaga kirish huquqingiz yo'q" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Kirish mumkin emas" });
    }
}


export default isSeo;
