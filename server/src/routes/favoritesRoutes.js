import express from 'express';
import {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from '../controllers/favoritesController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, asyncHandler(getAllFavorites));
router.post(
  '/',
  protect,
  asyncHandler(validateDestinationId),
  asyncHandler(addFavorite),
);
router.delete(
  '/:destinationId',
  protect,
  asyncHandler(validateDestinationId),
  asyncHandler(deleteFavorite),
);

export default router;
