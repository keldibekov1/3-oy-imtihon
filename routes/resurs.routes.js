import { Router } from "express";
import {
  createResurs,
  getAllResurs,
  getResursById,
  updateResurs,
  deleteResurs,
} from "../controllers/resurs.controller.js";

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
 *     summary: Barcha resurslarni olish
 *     tags: [Resurslar]
 *     responses:
 *       200:
 *         description: Resurslar ro‘yxati
 *       500:
 *         description: Server xatosi
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
router.delete("/resurslar/:id", deleteResurs);

export default router;
