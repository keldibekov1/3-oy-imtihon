import express from "express";
import {
  createFaoliyat,
  getAllFaoliyat,
  updateFaoliyat,
  deleteFaoliyat,
} from "../controllers/faoliyat.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Faoliyat
 *   description: Faoliyatlarni boshqarish
 */

/**
 * @swagger
 * /faoliyat:
 *   get:
 *     summary: "Barcha faoliyatlarni olish"
 *     tags:
 *       - "Faoliyat"
 *     responses:
 *       "200":
 *         description: "Barcha faoliyatlar ro‘yxati"
 *       "500":
 *         description: "Server xatosi"
 */
router.get("/faoliyat", getAllFaoliyat);

/**
 * @swagger
 * /faoliyat:
 *   post:
 *     summary: "Yangi faoliyat yaratish"
 *     tags:
 *       - "Faoliyat"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Sport"
 *               name:
 *                 type: string
 *                 example: "Futbol"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               filialId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       "201":
 *         description: "Faoliyat muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Noto‘g‘ri so‘rov"
 *       "500":
 *         description: "Server xatosi"
 */
router.post("/faoliyat", createFaoliyat);

/**
 * @swagger
 * /faoliyat/{id}:
 *   put:
 *     summary: "Faoliyatni yangilash"
 *     tags:
 *       - "Faoliyat"
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
 *               type:
 *                 type: string
 *                 example: "Madaniyat"
 *               name:
 *                 type: string
 *                 example: "Rassomchilik"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/new-photo.jpg"
 *               filialId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       "200":
 *         description: "Faoliyat yangilandi"
 *       "404":
 *         description: "Faoliyat topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.put("/faoliyat/:id", updateFaoliyat);

/**
 * @swagger
 * /faoliyat/{id}:
 *   delete:
 *     summary: "Faoliyatni o‘chirish"
 *     tags:
 *       - "Faoliyat"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: "Faoliyat muvaffaqiyatli o‘chirildi"
 *       "404":
 *         description: "Faoliyat topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.delete("/faoliyat/:id", deleteFaoliyat);

export default router;
