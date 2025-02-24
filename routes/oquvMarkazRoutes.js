import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import { getOquvMarkazStudents } from "../controllers/getOquvMarkazStudents.js";
import { getOquvMarkazStudentsExcel } from "../controllers/getOquvMarkazStudentsExcel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OquvMarkaz
 *   description: O‘quv markazlar bilan ishlash
 */

/**
 * @swagger
 * /oquvmarkaz/{oquvmarkazId}/students:
 *   get:
 *     summary: O‘quv markazning o‘quvchilarini olish
 *     description: Foydalanuvchi faqat o‘zi ochgan markazga tegishli o‘quvchilarni ko‘ra oladi.
 *     tags: [OquvMarkaz]
 *     parameters:
 *       - in: path
 *         name: oquvmarkazId
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘quv markazning ID raqami
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: O‘quv markazga tegishli o‘quvchilar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Ali"
 *                   surname:
 *                     type: string
 *                     example: "Valiyev"
 *                   phone:
 *                     type: string
 *                     example: "+998901234567"
 *                   email:
 *                     type: string
 *                     example: "ali@example.com"
 *       403:
 *         description: Foydalanuvchiga bu ma'lumotlarni ko‘rish taqiqlangan
 *       401:
 *         description: Avtorizatsiya xatosi (token noto‘g‘ri yoki yo‘q)
 *       500:
 *         description: Server xatosi
 */
router.get("/oquvmarkaz/:oquvmarkazId/students", verifyToken, getOquvMarkazStudents);


/**
 * @swagger
 * /oquvmarkaz/{oquvmarkazId}/students/excel:
 *   get:
 *     summary: O‘quv markazning o‘quvchilar ro‘yxatini Excel formatida olish
 *     description: Foydalanuvchi faqat o‘zi ochgan markazga tegishli o‘quvchilarni Excel shaklida yuklab olishi mumkin.
 *     tags: [OquvMarkaz]
 *     parameters:
 *       - in: path
 *         name: oquvmarkazId
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘quv markazning ID raqami
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Excel fayl yuklab olinadi
 *       403:
 *         description: Foydalanuvchiga bu ma'lumotlarni ko‘rish taqiqlangan
 *       404:
 *         description: O‘quvchilar topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/oquvmarkaz/:oquvmarkazId/students/excel", verifyToken, getOquvMarkazStudentsExcel);


export default router;
