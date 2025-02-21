
import express from "express";
import { FindAll, FindOne, Update, Delete, create } from "../controllers/region.controller.js";
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
 * paths:
 *   /regions:
 *     post:
 *       tags:
 *         - Regions
 *       summary: Create a new Region
 *       description: Creates a new region and returns the created region's details.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Region Name"
 *                   description: "The name of the region to be created."
 *               required:
 *                 - name
 *       responses:
 *         200:
 *           description: Region created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     description: "The created region details."
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                         description: "The ID of the newly created region."
 *                       name:
 *                         type: string
 *                         example: "Toshkent"
 *                         description: "The name of the newly created region."
 *                   message:
 *                     type: string
 *                     example: "Region created successfully"
 *         400:
 *           description: Bad Request - Missing required fields.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Name is required"
 *         500:
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error message."
 */

RegionRoute.post("/regions", create);


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
