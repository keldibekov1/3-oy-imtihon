import express from 'express';
import { createFaoliyat, getAllFaoliyat, updateFaoliyat, deleteFaoliyat } from '../controllers/faoliyat.controller.js';

const router = express.Router();

// Faoliyat yaratish
router.post('/', createFaoliyat);

// Barcha faoliyatlarni olish
router.get('/', getAllFaoliyat);

// Faoliyatni yangilash
router.put('/:id', updateFaoliyat);

// Faoliyatni o‘chirish
router.delete('/:id', deleteFaoliyat);

export default router;
