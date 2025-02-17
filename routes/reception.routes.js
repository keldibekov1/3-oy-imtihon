import { Router } from "express";
import {
  addReception,
  getAllReceptions,
  getReceptionById,
  updateReception,
  deleteReception,
} from "../controllers/reception.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Receptions
 *   description: Reception management
 */

/**
 * @swagger
 * /receptions:
 *   post:
 *     summary: Foydalanuvchini kursga yozish
 *     tags: [Receptions]
 */
router.post("/receptions", addReception);

/**
 * @swagger
 * /receptions:
 *   get:
 *     summary: Barcha yozilgan foydalanuvchilarni olish
 *     tags: [Receptions]
 */
router.get("/receptions", getAllReceptions);

/**
 * @swagger
 * /receptions/{id}:
 *   get:
 *     summary: Bitta foydalanuvchining kursga yozilganligini ko'rish
 *     tags: [Receptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/receptions/:id", getReceptionById);

/**
 * @swagger
 * /receptions/{id}:
 *   put:
 *     summary: Foydalanuvchini boshqa kursga yozish (yangilash)
 *     tags: [Receptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/receptions/:id", updateReception);

/**
 * @swagger
 * /receptions/{id}:
 *   delete:
 *     summary: Foydalanuvchini kursdan o‘chirish
 *     tags: [Receptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/receptions/:id", deleteReception);

export default router;
