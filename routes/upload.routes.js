import { Router } from 'express';
import uploadService from '../services/uploadService.js';

let MulterRoute = Router();

/**
 * @swagger
 * tags:
 *   name: File Upload
 *   description: Fayllarni yuklash API si
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Fayl yuklash
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Fayl muvaffaqiyatli yuklandi
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "File uploaded successfully: example.png"
 *       400:
 *         description: Hech qanday fayl yuklanmadi
 */
MulterRoute.post('/upload', uploadService.uploadFile(), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

export default MulterRoute;
