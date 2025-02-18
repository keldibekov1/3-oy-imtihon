import express from "express";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import selfComment from "../middleware/isComment.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Commentlarni boshqarish
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: "Barcha commentlarni olish"
 *     tags:
 *       - "Comments"
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
 *         description: "Har bir sahifada ko‘rsatiladigan commentlar soni"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       "200":
 *         description: "Barcha commentlar ro‘yxati"
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
 *                       star:
 *                         type: number
 *                       desc:
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
 *       "500":
 *         description: "Server xatosi"
 */
router.get("/comments", getAllComments);


/**
 * @swagger
 * /comments:
 *   post:
 *     summary: "Yangi comment yaratish"
 *     tags:
 *       - "Comments"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               oquvmarkazId:
 *                 type: integer
 *                 example: 2
 *               star:
 *                 type: number
 *                 example: 4.5
 *               desc:
 *                 type: string
 *                 example: "Ajoyib o‘quv markazi!"
 *     responses:
 *       "201":
 *         description: "Comment muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Noto‘g‘ri so‘rov"
 *       "500":
 *         description: "Server xatosi"
 */
router.post("/comments", verifyToken,createComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: "Commentni yangilash"
 *     tags:
 *       - "Comments"
 *     parameters:
 *       - name: id
 *         in: path
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
 *               star:
 *                 type: number
 *                 example: 4.8
 *               desc:
 *                 type: string
 *                 example: "Yaxshi markaz, lekin joyi ozgina torroq."
 *     responses:
 *       "200":
 *         description: "Comment yangilandi"
 *       "404":
 *         description: "Comment topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.put("/comments/:id",verifyToken, selfComment, updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: "Commentni o‘chirish"
 *     tags:
 *       - "Comments"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: "Comment muvaffaqiyatli o‘chirildi"
 *       "404":
 *         description: "Comment topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
router.delete("/comments/:id", verifyToken,selfComment, deleteComment);

export default router;
