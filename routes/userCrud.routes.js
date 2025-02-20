import express from "express";
import { Update, FindAll, Remove } from "../controllers/userCrud.controller.js";
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
userCrudRoute.get("/users", verifyToken, isAdmin, FindAll);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Foydalanuvchini qisman yangilash (status va type o‘zgartirilmaydi)
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
 *     security:
 *       - bearerAuth: []
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
userCrudRoute.patch("/users/:id", verifyToken, isAdmin, Update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Foydalanuvchini "pending" statusiga o‘tkazish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chirilayotgan foydalanuvchi ID-si
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi statusi "pending" qilindi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
userCrudRoute.delete("/users/:id", verifyToken, isAdmin, Remove);

export default userCrudRoute;
