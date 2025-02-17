import express from 'express';
import { createFilial, getAllFiliallar, updateFilial, deleteFilial } from '../controllers/filiallar.controller.js';

const router = express.Router();

// Filial yaratish
router.post('/', createFilial);

// Barcha filiallarni olish
router.get('/', getAllFiliallar);

// Filialni yangilash
router.put('/:id', updateFilial);

// Filialni o‘chirish
router.delete('/:id', deleteFilial);

export default router;
