import express from "express";
import {
  createFilial,
  getAllFiliallar,
  updateFilial,
  deleteFilial,
} from "../controllers/filiallar.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import isSeo from "../middleware/isSeo.js";
import isFilialOwnerOrAdmin from "../middleware/isFilialOwnerOrAdmin.js";

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
 *         description: "Har bir sahifada ko‘rsatiladigan filiallar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "Filiallarni qaysi maydonga qarab tartiblash"
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, region, createdAt]
 *           default: "name"
 *       - in: query
 *         name: filter
 *         description: "Filial nomi yoki joylashuvi bo‘yicha qidirish"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Barcha filiallar ro‘yxati"
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
router.post("/filial", verifyToken, isSeo, createFilial);

/**
 * @swagger
 * /filial/{id}:
 *   patch:
 *     summary: "Filialni qisman yangilash"
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
router.patch("/filial/:id", verifyToken, isSeo, updateFilial);

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
router.delete("/filial/:id",verifyToken, isFilialOwnerOrAdmin, deleteFilial);

export default router;
