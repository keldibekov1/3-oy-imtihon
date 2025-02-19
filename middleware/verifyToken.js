import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token topilmadi" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token noto'g'ri yoki muddati o'tgan" });
  }
};

export default verifyToken;
