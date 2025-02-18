import { Router } from "express";
import {
  createResurs,
  getAllResurs,
  getResursById,
  updateResurs,
  deleteResurs,
} from "../controllers/resurs.controller.js";
import isResurs from "../middleware/isResurs.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resurslar
 *   description: Resurslarni boshqarish
 */

/**
 * @swagger
 * /resurslar:
 *   post:
 *     summary: Yangi resurs yaratish
 *     tags: [Resurslar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               media:
 *                 type: string
 *               description:
 *                 type: string
 *               photo:
 *                 type: string
 *               createdBy:
 *                 type: integer
 *               resursCategoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Resurs yaratildi
 *       500:
 *         description: Server xatosi
 */
router.post("/resurslar", createResurs);

/**
 * @swagger
 * /resurslar:
 *   get:
 *     summary: "Barcha resurslarni olish"
 *     tags: [Resurslar]
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
 *         description: "Har bir sahifada ko‘rsatiladigan resurslar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "Resurslarni qaysi maydonga qarab tartiblash"
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, category, createdAt]
 *           default: "createdAt"
 *       - in: query
 *         name: filter
 *         description: "Resurslarni nomi yoki kategoriyasi bo‘yicha filtrlash"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Barcha resurslar ro‘yxati"
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
 *                       category:
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
 *       500:
 *         description: "Server xatosi"
 */
router.get("/resurslar", getAllResurs);


/**
 * @swagger
 * /resurslar/{id}:
 *   get:
 *     summary: Bitta resursni olish
 *     tags: [Resurslar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resurs ma'lumotlari
 *       404:
 *         description: Resurs topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/resurslar/:id", getResursById);

/**
 * @swagger
 * /resurslar/{id}:
 *   put:
 *     summary: Resursni yangilash
 *     tags: [Resurslar]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               media:
 *                 type: string
 *               description:
 *                 type: string
 *               photo:
 *                 type: string
 *               resursCategoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Resurs yangilandi
 *       404:
 *         description: Resurs topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/resurslar/:id", updateResurs);

/**
 * @swagger
 * /resurslar/{id}:
 *   delete:
 *     summary: Resursni o‘chirish
 *     tags: [Resurslar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resurs o‘chirildi
 *       404:
 *         description: Resurs topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/resurslar/:id", verifyToken, isResurs,deleteResurs);

export default router;
