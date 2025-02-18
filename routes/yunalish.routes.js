import { Router } from "express";
import { findAll, findOne, create, update, remove } from "../controllers/yunalish.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Yonalish
 *     description: Operations related to Yonalish (Direction)
 */

/**
 * @swagger
 * /yonalish:
 *   get:
 *     tags: [Yonalish]
 *     summary: Get all Yonalish
 *     description: Fetch all Yonalish records
 *     responses:
 *       200:
 *         description: A list of all Yonalish
 *       500:
 *         description: Internal server error
 */
router.get("/yonalish", findAll);

/**
 * @swagger
 * /yonalish/{id}:
 *   get:
 *     tags: [Yonalish]
 *     summary: Get a Yonalish by ID
 *     description: Fetch a single Yonalish by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Yonalish
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Yonalish found
 *       404:
 *         description: Yonalish not found
 *       500:
 *         description: Internal server error
 */
router.get("/yonalish/:id", findOne);

/**
 * @swagger
 * /yonalish:
 *   post:
 *     tags: [Yonalish]
 *     summary: Create a new Yonalish
 *     description: Create a new Yonalish by providing name, photo, and faoliyatid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Yonalish
 *               photo:
 *                 type: string
 *                 description: The photo URL associated with the Yonalish
 *               faoliyatid:
 *                 type: integer
 *                 description: The ID of the related Faoliyat
 *     responses:
 *       201:
 *         description: Yonalish created successfully
 *       400:
 *         description: Name and faoliyatid are required
 *       500:
 *         description: Internal server error
 */
router.post("/yonalish", create);

/**
 * @swagger
 * /yonalish/{id}:
 *   put:
 *     tags: [Yonalish]
 *     summary: Update an existing Yonalish
 *     description: Update the Yonalish by its ID, providing name, photo, and faoliyatid
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Yonalish to update
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
 *                 description: The new name of the Yonalish
 *               photo:
 *                 type: string
 *                 description: The new photo URL associated with the Yonalish
 *               faoliyatid:
 *                 type: integer
 *                 description: The new ID of the related Faoliyat
 *     responses:
 *       200:
 *         description: Yonalish updated successfully
 *       404:
 *         description: Yonalish not found
 *       500:
 *         description: Internal server error
 */
router.put("/yonalish/:id", update);

/**
 * @swagger
 * /yonalish/{id}:
 *   delete:
 *     tags: [Yonalish]
 *     summary: Delete a Yonalish by ID
 *     description: Delete a Yonalish by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Yonalish to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Yonalish deleted successfully
 *       404:
 *         description: Yonalish not found
 *       500:
 *         description: Internal server error
 */
router.delete("/yonalish/:id", remove);

export default router;