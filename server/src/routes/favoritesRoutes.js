import express from 'express';
import {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from '../controllers/favoritesController.js';

const router = express.Router();

router.get('/', getAllFavorites);
router.post('/', addFavorite);
router.delete('/:destinationId', deleteFavorite);

export default router;
