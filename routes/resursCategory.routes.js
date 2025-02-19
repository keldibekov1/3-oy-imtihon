import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/resurscategory.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ResursCategory
 *   description: Resurs kategoriyalari
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     tags: [ResursCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dasturlash"
 *               photo:
 *                 type: string
 *                 example: "image.png"
 *     responses:
 *       201:
 *         description: Yangi kategoriya yaratildi
 */
router.post("/categories", createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: "Barcha kategoriyalarni olish"
 *     tags: [ResursCategory]
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
 *         description: "Har bir sahifada ko‘rsatiladigan kategoriyalar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "Kategoriyalarni qaysi maydonga qarab tartiblash"
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *           default: "createdAt"
 *       - in: query
 *         name: filter
 *         description: "Kategoriyalarni nomi bo‘yicha filtrlash"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Barcha kategoriyalar ro‘yxati"
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
router.get("/categories", getAllCategories);


/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: ID bo‘yicha kategoriyani olish
 *     tags: [ResursCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Kategoriya ma'lumotlari
 */
router.get("/categories/:id", getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Kategoriyani yangilash
 *     tags: [ResursCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangilangan Dasturlash"
 *               photo:
 *                 type: string
 *                 example: "new-image.png"
 *     responses:
 *       200:
 *         description: Kategoriya yangilandi
 */
router.patch("/categories/:id", updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Kategoriyani o‘chirish
 *     tags: [ResursCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Kategoriya o‘chirildi
 */
router.delete("/categories/:id", deleteCategory);

export default router;
