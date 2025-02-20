import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { totp } from "otplib";
import nodemailer from "nodemailer";
import Joi from "joi";
import { logger } from "../services/logger.js";

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
        logger.warn(`📌 Ro‘yxatdan o‘tish xatosi: ${error.details[0].message}`);
        return res.status(400).json({ message: error.details[0].message });
      }
  
      let { name, surname, password, type, email, phone } = value;
      let existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        if (existingUser.status == "pending") {
          const token = jwt.sign({ email, name, type }, "secret", { expiresIn: "1h" });
  
          await transporter.sendMail({
            to: email,
            subject: "Account activation",
            html: `
              <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #333;">Assalomu alaykum, ${name}!</h2>
                  <p style="color: #666;">Akkauntingizni aktiv qilish uchun quyidagi tugmani bosing:</p>
                  <a href="http://localhost:3000/auth/activate/${token}" 
                     style="display: inline-block; background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 10px;">
                    🔥 Akkauntni Aktiv Qilish
                  </a>
                  
                  <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
                  <p style="color: #999; font-size: 12px;">Ushbu xabar avtomatik jo‘natildi, unga javob qaytarishingiz shart emas.</p>
                </div>
              </div>
            `
          });
  
          logger.info(`🔄 Qayta aktivatsiya: ${email}`);
          return res.status(201).json({ message: "Royxatdan otildi. Emailingizni tekshiring.", token });
        }
  
        logger.warn(`⚠️ Royxatdan otish urinish (mavjud foydalanuvchi): ${email}`);
        return res.status(400).json({ message: "Bu email allaqachon royxatdan otgan va aktivlashtirilgan." });
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
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333;">Assalomu alaykum, ${name}!</h2>
              <p style="color: #666;">Akkauntingizni aktiv qilish uchun quyidagi tugmani bosing:</p>
              <a href="http://:3000/auth/activate/${token}" 
                 style="display: inline-block; background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 10px;">
                🔥 Akkauntni Aktiv Qilish
              </a>
              
              <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">Ushbu xabar avtomatik jonatildi, unga javob qaytarishingiz shart emas.</p>
            </div>
          </div>
        `
      });
      
  
      logger.info(`✅ Yangi foydalanuvchi royxatdan otdi: ${email}`);
      res.status(201).json({ message: "Royxatdan otildi. Emailingizni tekshiring.", token });
    } catch (error) {
      logger.error(`❌ Royxatdan otishda xatolik: ${error.message}`);
      res.status(500).json({ message: "Server xatosi" });
    }
  };



  const login = async (req, res) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        logger.warn(`Login xatosi: ${error.details[0].message}`);
        return res.status(400).json({ message: error.details[0].message });
      }
  
      let { email, password } = value;
      let user = await User.findOne({ where: { email } });
  
      if (!user) {
        logger.warn(`Login urinish: foydalanuvchi topilmadi (${email})`);
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
      }
  
      if (user.status !== "active") {
        logger.warn(`Login urinish: faollashtirilmagan akkaunt (${email})`);
        return res.status(403).json({ message: "Akkount aktiv emas! Emailingizni tekshiring." });
      }
  
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        logger.warn(`Login urinish: notogri parol (${email})`);
        return res.status(401).json({ message: "Parol notogri" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, type: user.type }, 
        "secret", 
        { expiresIn: "1h" }
      );
  
      logger.info(`Muvaffaqiyatli login: ${email}`);
      res.status(200).json({ token });
    } catch (error) {
      logger.error(`Login server xatosi: ${error.message}`);
      console.error(error);
      res.status(500).json({ message: "Server xatosi" });
    }
  };
  



  const activate = async (req, res) => {
    try {
      let { token } = req.params;
      let decoded = jwt.verify(token, "secret");
      logger.info(`Akkount aktivatsiya urinish: ${decoded.email}`);
  
      let user = await User.findOne({ where: { email: decoded.email.toLowerCase() } });
      logger.debug(`Bazadan topilgan foydalanuvchi: ${JSON.stringify(user)}`);
  
      if (!user) {
        logger.warn(`Aktivatsiya xatosi: foydalanuvchi topilmadi (${decoded.email})`);
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
      }
  
      let updated = await User.update({ status: "active" }, { where: { email: decoded.email } });
      logger.debug(`Foydalanuvchi yangilandi: ${JSON.stringify(updated)}`);
  
      logger.info(`Akkount aktiv qilindi: ${decoded.email}`);
      res.status(200).json({ message: "Akkount aktiv qilindi!" });
    } catch (error) {
      logger.error(`Aktivatsiya xatosi: ${error.message}`);
      res.status(500).json({ message: "Server xatosi" });
    }
  };
  



export { register, login, activate };