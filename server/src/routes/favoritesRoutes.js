import express from 'express';
import {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from '../controllers/favoritesController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(getAllFavorites));
router.post(
  '/',
  asyncHandler(validateDestinationId),
  asyncHandler(addFavorite),
);
router.delete(
  '/:destinationId',
  asyncHandler(validateDestinationId),
  asyncHandler(deleteFavorite),
);

export default router;
