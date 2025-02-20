import jwt from "jsonwebtoken";


const isAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Token topilmadi" });
    }

    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, "secret"); // `.env` dan olish

    if (decoded.type !== "admin") {
      return res.status(403).json({ message: "Bu sahifaga kirish huquqingiz yo'q" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Kirish mumkin emas" });
  }
};

export default isAdmin;
