import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { totp } from "otplib";
import nodemailer from "nodemailer";
import Joi from "joi";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testotpn16@gmail.com",
    pass: "zyhe vmzp llzh tbhc",
  },
});

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    surname: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(6).required(),
    type: Joi.string().valid("user", "admin", "seo").default("user"),
    email: Joi.string().email().required(),
    phone: Joi.string().min(9).max(13).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

   let {name, surname,password, type, email,phone } = value; 

    let existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (existingUser.status == "pending") {
        const token = jwt.sign({ email, name , type }, "secret", { expiresIn: "1h" });

        await transporter.sendMail({
          to: email,
          subject: "Account activation (Again)",
          text: `Siz allaqachon royxatdan otgan bolsangiz, lekin aktivlashtirmagan bolsangiz, shu havola orqali faollashtiring: http://localhost:3000/auth/activate/${token}`,
        });

        return res.status(200).json({ message: "Siz allaqachon royxatdan otganingiz uchun yana aktivatsiya havolasi yuborildi." });
      }

      return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan va aktivlashtirilgan." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let user = await User.create({
      surname,
      password: hashedPassword,
      name,
      type,
      phone,
      status: "pending", 
      email,
    });

    const token = jwt.sign({ email, name, type }, "secret", { expiresIn: "1h" });

    await transporter.sendMail({
      to: email,
      subject: "Account activation",
      text: `http://localhost:3000/auth/activate/${token}`,
    });

    res.status(201).json({ message: "Ro'yxatdan o'tildi. Emailingizni tekshiring.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};



const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let { email, password } = value;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Akkount aktiv emas! Emailingizni tekshiring." });
    }

    let compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: "Parol notogri" });
    }

    let token = jwt.sign(
      { email: user.email, type: user.type }, 
      "secret", 
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};



const activate = async (req, res) => {
  try {
    let { token } = req.params;
    let decoded = jwt.verify(token, "secret");

    let user = await User.findOne({ where: { email: decoded.email.toLowerCase() } });
    console.log("Bazadan topilgan foydalanuvchi:", user);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    let updated = await User.update({ status: "active" }, { where: { email: decoded.email } });
    console.log("Yangilash natijasi:", updated);

    res.status(200).json({ message: "Akkount aktiv qilindi!" });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({ message: "Server xatosi" });
  }
};





export { register, login, activate };

