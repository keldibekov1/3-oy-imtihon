
import express from "express";
import { FindAll, FindOne, Update, Delete } from "../controllers/region.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const RegionRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Regionlar bo'yicha API
 */

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Barcha regionlarni olish
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: Barcha regionlar ro'yxati
 */
RegionRoute.get("/regions", FindAll);

/**
 * @swagger
 * /regions/{id}:
 *   get:
 *     summary: Bitta regionni olish
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Region IDsi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Topilgan region
 *       404:
 *         description: Region topilmadi
 */
RegionRoute.get("/regions/:id", FindOne);

/**
 * @swagger
 * /regions/{id}:
 *   patch:
 *     summary: Regionni yangilash
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Region IDsi
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
 *                 example: "Yangi nom"
 *     responses:
 *       200:
 *         description: Region yangilandi
 *       404:
 *         description: Region topilmadi
 */
RegionRoute.patch("/regions/:id",isAdmin, Update);

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: Regionni o'chirish
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Region IDsi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Region o'chirildi
 *       404:
 *         description: Region topilmadi
 */
RegionRoute.delete("/regions/:id",isAdmin ,Delete);

export default RegionRoute;
