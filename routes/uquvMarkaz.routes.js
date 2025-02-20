import express from "express";
import { findAll, findOne, create, update, remove } from "../controllers/uquvMarkaz.controller.js";
import isSeoOwner from "../middleware/isSeoOwner.js";
import verifyToken from "../middleware/verifyToken.js";
import isSeo from "../middleware/isSeo.js";

const router = express.Router();

/**
 * @swagger
 * /oquvmarkaz:
 *   get:
 *     summary: "Barcha o'quv markazlarini olish"
 *     tags: [OquvMarkaz]
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
 *         description: "Har bir sahifada ko‘rsatiladigan o'quv markazlar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "O'quv markazlarini qaysi maydonga qarab tartiblash"
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, region, createdAt]
 *           default: "createdAt"
 *       - in: query
 *         name: filter
 *         description: "O'quv markazlarini nomi yoki regioni bo‘yicha filtrlash"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Barcha o'quv markazlar ro‘yxati"
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
 *                       name:
 *                         type: string
 *                       region:
 *                         type: string
 *                       address:
 *                         type: string
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
router.get("/oquvmarkaz", findAll);


/**
 * @swagger
 * /oquvmarkaz/{id}:
 *   get:
 *     summary: "Bitta o'quv markazini olish"
 *     tags:
 *       - "OquvMarkaz"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: "O'quv markazi ma'lumotlari"
 *       "404":
 *         description: "Ma'lumot topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.get("/oquvmarkaz/:id", findOne);

/**
 * @swagger
 * /oquvmarkaz:
 *   post:
 *     summary: "Yangi o'quv markazi yaratish"
 *     tags:
 *       - "OquvMarkaz"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "IT Academy"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               region:
 *                 type: string
 *                 example: "Toshkent"
 *               address:
 *                 type: string
 *                 example: "Toshkent shahar, Chilonzor tumani"
 *               
 *     responses:
 *       "201":
 *         description: "O'quv markazi muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Noto‘g‘ri so‘rov"
 *       "500":
 *         description: "Server xatosi"
 */
router.post("/oquvmarkaz", verifyToken, isSeo, create);

/**
 * @swagger
 * /oquvmarkaz/{id}:
 *   patch:
 *     summary: "O'quv markazini qisman yangilash"
 *     tags:
 *       - "OquvMarkaz"
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
 *               name:
 *                 type: string
 *                 example: "Yangi IT Academy"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/new-photo.jpg"
 *               region:
 *                 type: string
 *                 example: "Samarqand"
 *               address:
 *                 type: string
 *                 example: "Samarqand shahar, Registon ko‘chasi"
 *     responses:
 *       "200":
 *         description: "O'quv markazi yangilandi"
 *       "404":
 *         description: "O'quv markazi topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.patch("/oquvmarkaz/:id", verifyToken,  update);


/**
 * @swagger
 * /oquvmarkaz/{id}:
 *   delete:
 *     summary: "O'quv markazini o‘chirish"
 *     tags:
 *       - "OquvMarkaz"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: "O'quv markazi muvaffaqiyatli o‘chirildi"
 *       "404":
 *         description: "O'quv markazi topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.delete("/oquvmarkaz/:id",verifyToken, remove);

export default router;
