import express from "express";
import { Update, FindAll} from "../controllers/userCrud.controller.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

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
userCrudRoute.get("/users",verifyToken,isAdmin, FindAll);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash (status va type o‘zgartirilmaydi)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Abdulla
 *               surname:
 *                 type: string
 *                 example: Karimov
 *               email:
 *                 type: string
 *                 example: abdulla@gmail.com
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *          
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       400:
 *         description: Validatsiya xatosi yoki email band
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
userCrudRoute.put("/users/:id",verifyToken,isAdmin, Update);



export default userCrudRoute;
