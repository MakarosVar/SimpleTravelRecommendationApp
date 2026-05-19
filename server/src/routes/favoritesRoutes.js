import express from 'express';
import {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from '../controllers/favoritesController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';

const router = express.Router();

router.get('/', getAllFavorites);
router.post('/', validateDestinationId, addFavorite);
router.delete(
  '/:destinationId',
  validateDestinationId,
  deleteFavorite,
);

export default router;
