import express from "express";
import {
  createFilial,
  getAllFiliallar,
  updateFilial,
  deleteFilial,
} from "../controllers/filiallar.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Filial
 *   description: Filiallarni boshqarish
 */

/**
 * @swagger
 * /filial:
 *   get:
 *     summary: "Barcha filiallarni olish"
 *     tags:
 *       - "Filial"
 *     responses:
 *       "200":
 *         description: "Barcha filiallar ro‘yxati"
 *       "500":
 *         description: "Server xatosi"
 */
router.get("/filial", getAllFiliallar);

/**
 * @swagger
 * /filial:
 *   post:
 *     summary: "Yangi filial yaratish"
 *     tags:
 *       - "Filial"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Markaziy Filial"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               region:
 *                 type: string
 *                 example: "Toshkent"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               address:
 *                 type: string
 *                 example: "Toshkent shahar, Chilonzor tumani"
 *               oquvmarkazId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       "201":
 *         description: "Filial muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Noto‘g‘ri so‘rov"
 *       "500":
 *         description: "Server xatosi"
 */
router.post("/filial", createFilial);

/**
 * @swagger
 * /filial/{id}:
 *   put:
 *     summary: "Filialni yangilash"
 *     tags:
 *       - "Filial"
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
 *                 example: "Yangi Filial"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/new-photo.jpg"
 *               region:
 *                 type: string
 *                 example: "Samarqand"
 *               phone:
 *                 type: string
 *                 example: "+998901112233"
 *               address:
 *                 type: string
 *                 example: "Samarqand shahar, Registon ko‘chasi"
 *               oquvmarkazId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       "200":
 *         description: "Filial yangilandi"
 *       "404":
 *         description: "Filial topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.put("/filial/:id", updateFilial);

/**
 * @swagger
 * /filial/{id}:
 *   delete:
 *     summary: "Filialni o‘chirish"
 *     tags:
 *       - "Filial"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: "Filial muvaffaqiyatli o‘chirildi"
 *       "404":
 *         description: "Filial topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.delete("/filial/:id", deleteFilial);

export default router;
