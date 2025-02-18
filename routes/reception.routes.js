import { Router } from "express";
import { addReception, getAllReceptions, getReceptionById, updateReception, deleteReception } from "../controllers/reception.controller.js";

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
 *               userId:
 *                 type: integer
 *                 description: The ID of the user to enroll
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
router.post("/receptions", addReception);

/**
 * @swagger
 * /receptions:
 *   get:
 *     tags: [Reception]
 *     summary: Get all receptions
 *     description: Fetch all receptions with user and course details
 *     responses:
 *       200:
 *         description: A list of all receptions
 *       500:
 *         description: Internal server error
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
 *   put:
 *     tags: [Reception]
 *     summary: Update a reception
 *     description: Update the reception (enrollment) of a user by providing userId and oquvmarkazId
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
 *                 description: The new user ID
 *               oquvmarkazId:
 *                 type: integer
 *                 description: The new course ID
 *     responses:
 *       200:
 *         description: Reception updated successfully
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Internal server error
 */
router.put("/receptions/:id", updateReception);

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
