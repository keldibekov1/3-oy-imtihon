import express from "express";
import { findAll, findOne, create, update, remove } from "../controllers/userLikes.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserLikes
 *   description: Foydalanuvchilarning yoqtirgan o‘quv markazlarini boshqarish
 */

/**
 * @swagger
 * /userlikes:
 *   get:
 *     summary: "Barcha yoqtirishlarni olish"
 *     tags:
 *       - "UserLikes"
 *     responses:
 *       "200":
 *         description: "Barcha yoqtirishlar ro‘yxati"
 *       "500":
 *         description: "Server xatosi"
 */
router.get("/userlikes", findAll);

/**
 * @swagger
 * /userlikes/{id}:
 *   get:
 *     summary: "Bitta yoqtirishni olish"
 *     tags:
 *       - "UserLikes"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: "Yoqtirish ma'lumotlari"
 *       "404":
 *         description: "Ma'lumot topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.get("/userlikes/:id", findOne);

/**
 * @swagger
 * /userlikes:
 *   post:
 *     summary: "Foydalanuvchi tomonidan o‘quv markazini yoqtirish"
 *     tags:
 *       - "UserLikes"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               oquvmarkazId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       "201":
 *         description: "Yangi yoqtirish muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Noto‘g‘ri so‘rov"
 *       "500":
 *         description: "Server xatosi"
 */
router.post("/userlikes", create);

/**
 * @swagger
 * /userlikes/{id}:
 *   put:
 *     summary: "Foydalanuvchining yoqtirishini yangilash"
 *     tags:
 *       - "UserLikes"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               oquvmarkazId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       "200":
 *         description: "Yoqtirish muvaffaqiyatli yangilandi"
 *       "404":
 *         description: "Ma'lumot topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.put("/userlikes/:id", update);

/**
 * @swagger
 * /userlikes/{id}:
 *   delete:
 *     summary: "Foydalanuvchining yoqtirishini o‘chirish"
 *     tags:
 *       - "UserLikes"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: "Yoqtirish muvaffaqiyatli o‘chirildi"
 *       "404":
 *         description: "Ma'lumot topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.delete("/userlikes/:id", remove);

export default router;

