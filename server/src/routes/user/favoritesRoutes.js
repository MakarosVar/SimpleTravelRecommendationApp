import express from 'express';
import {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from '../../controllers/user/favoritesController.js';
import { validateDestinationId } from '../../middleware/validateDestination.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllFavorites);
router.post(
  '/',
  protect,
  asyncHandler(validateDestinationId),
  addFavorite,
);
router.delete(
  '/:destinationId',
  protect,
  asyncHandler(validateDestinationId),
  deleteFavorite,
);

export default router;
