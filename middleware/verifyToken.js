import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token topilmadi" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;

    let userId = req.user.id;
    let user = await User.findOne({ where: { id: userId } });
    if(user.status == "pending") {
      return res.status(401).json({ message: "Sizning akkauntingiz active emas !" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token noto'g'ri yoki muddati o'tgan" });
  }
};

export default verifyToken;
