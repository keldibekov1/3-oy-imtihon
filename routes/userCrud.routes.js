import express from "express";
import { Update, FindAll} from "../controllers/userCrud.controller.js";
import isAdmin from "../middleware/isAdmin.js";
import verifyToken from "../middleware/verifyToken.js";
import User from "../models/user.model.js";

import OquvMarkaz from "../models/uquvMarkaz.model.js";
import Filial from "../models/filiallar.model.js";
import Comment from "../models/comment.model.js";

const userCrudRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilarni boshqarish
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Hamma foydalanuvchilarni olish (pagination bilan)
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami (default = 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Har bir sahifadagi foydalanuvchilar soni (default = 10)
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
userCrudRoute.get("/users",isAdmin, FindAll);


/**
 * @swagger
 * /myinfo:
 *   get:
 *     summary: Foydalanuvchining shaxsiy ma'lumotlarini olish
 *     description: Ushbu endpoint token orqali foydalanuvchining ma'lumotlarini qaytaradi (parolni chiqarib tashlaydi).
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari (parolsiz)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Ali
 *                 surname:
 *                   type: string
 *                   example: Valiyev
 *                 phone:
 *                   type: string
 *                   example: +998901234567
 *                 email:
 *                   type: string
 *                   example: test@example.com
 *                 type:
 *                   type: string
 *                   example: seo
 *                 status:
 *                   type: string
 *                   example: active
 *       401:
 *         description: Noto‘g‘ri yoki mavjud bo‘lmagan token
 *       500:
 *         description: Server xatosi
 */
userCrudRoute.get("/myinfo", verifyToken, async (req, res) => {
    try {
        // Bazadan foydalanuvchini id bo‘yicha topamiz
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "name", "surname", "phone", "email", "type", "status"]
        });

        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
});



///
/**
 * @swagger
 * /mycenter:
 *   get:
 *     summary: Foydalanuvchining o'quv markazlarini olish
 *     description: Foydalanuvchining yaratgan barcha o'quv markazlarini filiallar va kommentlar bilan qaytaradi.
 *     tags:
 *       - OquvMarkaz
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Qaytariladigan elementlar soni (default = 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami (default = 1)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Saralash mezoni (masalan, "name" yoki "createdAt")
 *     responses:
 *       200:
 *         description: Foydalanuvchining o'quv markazlari
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Super Education"
 *                   photo:
 *                     type: string
 *                     example: "superedu.jpg"
 *                   region:
 *                     type: string
 *                     example: "Toshkent"
 *                   address:
 *                     type: string
 *                     example: "Yunusobod, 10-mavze"
 *                   createdBy:
 *                     type: integer
 *                     example: 5
 *                   filials:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         name:
 *                           type: string
 *                           example: "Super Edu Filial 1"
 *                         photo:
 *                           type: string
 *                           example: "filial1.jpg"
 *                         region:
 *                           type: string
 *                           example: "Chilonzor"
 *                         phone:
 *                           type: string
 *                           example: "+998901234567"
 *                         address:
 *                           type: string
 *                           example: "Metro Alisher Navoiy"
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 100
 *                         desc:
 *                           type: string
 *                           example: "Zo'r markaz!"
 *                         star:
 *                           type: integer
 *                           example: 5
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-21T10:00:00Z"
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 15
 *                             name:
 *                               type: string
 *                               example: "Hasan"
 *       401:
 *         description: Noto‘g‘ri yoki mavjud bo‘lmagan token
 *       500:
 *         description: Server xatosi
 */
userCrudRoute.get("/mycenter", verifyToken, async (req, res) => {
    try {
        let { limit = 10, page = 1, sortBy } = req.query;
        limit = parseInt(limit);
        const offset = (parseInt(page) - 1) * limit;

        const queryOptions = {
            limit,
            offset,
            order: sortBy ? [[sortBy, "ASC"]] : [["createdAt", "DESC"]],
            where: { createdBy: req.user.id },
            include: [
                {
                    model: Filial,
                    as: "filials",
                    attributes: ["id", "name", "photo", "region", "phone", "address"],
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id", "desc", "star", "createdAt"],
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "name"], 
                        }
                    ]
                }
            ],
        };

        const centers = await OquvMarkaz.findAll(queryOptions);
        res.json(centers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
});


export default userCrudRoute;
