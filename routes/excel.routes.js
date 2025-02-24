import express from "express";
import { generateUserFile } from "../services/userService.js"; // Servisni import qilish
import isAdmin from "../middleware/isAdmin.js";

// Router yaratish
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User-related operations
 */

/**
 * @swagger
 * /excel-users:
 *   get:
 *     summary: "Create and download users list"
 *     tags: [Download-Excel]
 *     responses:
 *       200:
 *         description: "Fayl muvaffaqiyatli saqlandi va yuklandi"
 *       500:
 *         description: "Server xatosi"
 */
router.get("/excel-users", isAdmin, async (req, res) => {
  try {
    // Servis orqali fayl yaratish
    const filePath = await generateUserFile();

    res.download(filePath, "users.xlsx", (err) => {
      if (err) {
        console.error("Xatolik yuz berdi:", err);
        res.status(500).send("Faylni yuklashda xatolik yuz berdi");
      } else {
        console.log("Fayl muvaffaqiyatli yuklandi");
      }
    });
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    res.status(500).send("Server xatosi");
  }
});

export default router;
