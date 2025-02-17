import express from 'express';
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js'; 

const router = express.Router();

router.post('/', createComment);

router.get('/', getAllComments);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

export default router;
