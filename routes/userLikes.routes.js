import express from "express";
import { findAll, findOne, create, update, remove } from "../controllers/userLikes.controller.js";

const router = express.Router();

/**
 * @swagger
 * /userlikes:
 *   get:
 *     summary: "Barcha yoqtirishlarni olish"
 *     tags: [UserLikes]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "Sahifa raqami"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         description: "Har bir sahifada ko‘rsatiladigan yoqtirishlar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "Yoqtirishlarni qaysi maydonga qarab tartiblash"
 *         required: false
 *         schema:
 *           type: string
 *           enum: [createdAt, userId, oquvmarkazId]
 *           default: "createdAt"
 *       - in: query
 *         name: filter
 *         description: "Yoqtirishlarni foydalanuvchi yoki o‘quv markazi bo‘yicha filtrlash"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Barcha yoqtirishlar ro‘yxati"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       oquvmarkazId:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *       500:
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

