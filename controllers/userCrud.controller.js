import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    surname: Joi.string().min(2).max(50).required(),
    email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) // Email faqat "@gmail.com" bo'lishi kerak
    .required()
    .messages({
        "string.pattern.base": "Email faqat @gmail.com bo'lishi kerak",
    }),
phone: Joi.string()
    .pattern(/^\+998[0-9]{9}$/) // O'zbekiston telefon raqami formati: +998xxxxxxxxx
    .required()
    .messages({
        "string.pattern.base": "Telefon raqam formati noto‘g‘ri! +998 bilan boshlanishi kerak",
    }),
    password: Joi.string().min(6).required(), // Faqat parol o'zgarishi mumkin
});

// async function Remove(req, res) {
//     try {

//         await User.destroy({ where: { id: req.params.id } });
//         let user = await User.findByPk(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).send({ message: "User deleted successfully" });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// }

async function Update(req, res) {
    try {
        const { id } = req.params;
        const { name, surname, email, phone, password } = req.body;

        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await user.update({ name, surname, email, phone, password: hashedPassword });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}


async function FindAll(req, res) {
    try {
        let { page, limit } = req.query;

        page = parseInt(page) || 1;  
        limit = parseInt(limit) || 10;  

        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            attributes: ["id", "name", "surname", "email", "phone"], // Faqat kerakli maydonlarni olish
            limit,
            offset,
            order: [["createdAt", "DESC"]], // Eng oxirgi foydalanuvchilarni birinchi olib kelish
        });

        res.status(200).json({
            totalUsers: count,   // Umumiy userlar soni
            totalPages: Math.ceil(count / limit), // Umumiy sahifalar soni
            currentPage: page,
            users: rows,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}


export {  Update , FindAll};

