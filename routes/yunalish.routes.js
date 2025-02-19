import { Router } from "express";
import { findAll, findOne, create, Update, remove } from "../controllers/yunalish.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import isYonalishOwner from "../middleware/isYonalishOwner.js";

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
 *     description: Fetch all Yonalish records with pagination, sorting, and filtering options
 *     parameters:
 *       - in: query
 *         name: page
 *         description: The page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         description: The number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: Field to sort by
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *           default: "createdAt"
 *       - in: query
 *         name: filter
 *         description: Apply filter on Yonalish records (e.g., filter by name or region)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of all Yonalish records with pagination
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
 *                       createdAt:
 *                         type: string
 *                         format: date-time
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
router.post("/yonalish", verifyToken, isYonalishOwner, create);

/**
 * @swagger
 * /yonalish/{id}:
 *   patch:
 *     tags: [Yonalish]
 *     summary: Update specific fields of an existing Yonalish
 *     description: Update the Yonalish partially by its ID, providing any subset of name, photo, or faoliyatid
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
router.patch("/yonalish/:id", verifyToken, isYonalishOwner, Update);

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
router.delete("/yonalish/:id",verifyToken, isYonalishOwner, remove);

export default router;