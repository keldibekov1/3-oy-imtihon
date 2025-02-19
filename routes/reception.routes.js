import { Router } from "express";
import { addReception, getAllReceptions, getReceptionById, updateReception, deleteReception } from "../controllers/reception.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Reception
 *     description: Operations related to course receptions (enrollment)
 */

/**
 * @swagger
 * /receptions:
 *   post:
 *     tags: [Reception]
 *     summary: Add a new reception (enroll a user)
 *     description: Add a new reception by providing userId and oquvmarkazId (course and user)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oquvmarkazId:
 *                 type: integer
 *                 description: The ID of the course the user is enrolling in
 *     responses:
 *       201:
 *         description: Reception created successfully
 *       404:
 *         description: User or OquvMarkaz not found
 *       500:
 *         description: Internal server error
 */
router.post("/receptions",verifyToken, addReception);

/**
 * @swagger
 * /receptions:
 *   get:
 *     tags: [Reception]
 *     summary: "Get all receptions"
 *     description: "Fetch all receptions with user and course details"
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "Page number"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         description: "Number of receptions per page"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "Sort receptions by a specific field"
 *         required: false
 *         schema:
 *           type: string
 *           enum: [userId, oquvmarkazId, createdAt]
 *           default: "createdAt"
 *       - in: query
 *         name: filter
 *         description: "Filter receptions by user or course details"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "A list of all receptions"
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
 *                       userId:
 *                         type: integer
 *                       oquvmarkazId:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       oquvmarkaz:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
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
 *         description: "Internal server error"
 */
router.get("/receptions", getAllReceptions);


/**
 * @swagger
 * /receptions/{id}:
 *   get:
 *     tags: [Reception]
 *     summary: Get a reception by ID
 *     description: Fetch a specific reception by ID along with user and course details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reception
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reception found
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Internal server error
 */
router.get("/receptions/:id", getReceptionById);

/**
 * @swagger
 * /receptions/{id}:
 *   patch:
 *     tags: [Reception]
 *     summary: Update a reception (partial update)
 *     description: Partially update the reception (enrollment) of a user by providing userId and/or oquvmarkazId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reception to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The new user ID (optional)
 *               oquvmarkazId:
 *                 type: integer
 *                 description: The new course ID (optional)
 *     responses:
 *       200:
 *         description: Reception updated successfully
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Internal server error
 */
router.patch("/receptions/:id", updateReception);

/**
 * @swagger
 * /receptions/{id}:
 *   delete:
 *     tags: [Reception]
 *     summary: Delete a reception by ID
 *     description: Remove a user from the course by deleting their reception
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reception to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reception deleted successfully
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Internal server error
 */
router.delete("/receptions/:id", deleteReception);

export default router;
