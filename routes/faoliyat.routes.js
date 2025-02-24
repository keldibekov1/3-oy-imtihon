import express from "express";
import {
  createFaoliyat,
  getAllFaoliyat,
  updateFaoliyat,
  deleteFaoliyat,
} from "../controllers/faoliyat.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

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
 *         description: "Har bir sahifada ko‘rsatiladigan faoliyatlar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       "200":
 *         description: "Barcha faoliyatlar ro‘yxati"
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
 *                       description:
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
 *               oquvmarkazId:
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
router.post("/faoliyat",verifyToken, isAdmin, createFaoliyat);

/**
 * @swagger
 * /faoliyat/{id}:
 *   patch:
 *     summary: "Faoliyatni qisman yangilash"
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
 *               oquvmarkazId:
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
router.patch("/faoliyat/:id",verifyToken, isAdmin, updateFaoliyat);

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
router.delete("/faoliyat/:id",verifyToken, isAdmin, deleteFaoliyat);

export default router;
