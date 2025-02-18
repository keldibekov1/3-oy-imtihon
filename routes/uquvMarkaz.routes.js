import express from "express";
import { findAll, findOne, create, update, remove } from "../controllers/uquvMarkaz.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OquvMarkaz
 *   description: O'quv markazlarni boshqarish
 */

/**
 * @swagger
 * /oquvmarkaz:
 *   get:
 *     summary: "Barcha o'quv markazlarini olish"
 *     tags:
 *       - "OquvMarkaz"
 *     responses:
 *       "200":
 *         description: "Barcha o'quv markazlar ro‘yxati"
 *       "500":
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
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       "201":
 *         description: "O'quv markazi muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Noto‘g‘ri so‘rov"
 *       "500":
 *         description: "Server xatosi"
 */
router.post("/oquvmarkaz", create);

/**
 * @swagger
 * /oquvmarkaz/{id}:
 *   put:
 *     summary: "O'quv markazini yangilash"
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
router.put("/oquvmarkaz/:id", update);

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
router.delete("/oquvmarkaz/:id", remove);

export default router;
