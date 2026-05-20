import express from 'express';
import {
  getAllTrips,
  addTripItem,
  updateTripItem,
  deleteTripItem,
} from '../controllers/tripController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';
import { validateTripUpdate } from '../middleware/validateTripUpdate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllTrips);

router.post(
  '/',
  protect,
  asyncHandler(validateDestinationId),
  addTripItem,
);

router.patch(
  '/:destinationId',
  protect,
  asyncHandler(validateDestinationId),
  validateTripUpdate,
  updateTripItem,
);

router.delete(
  '/:destinationId',
  protect,
  asyncHandler(validateDestinationId),
  deleteTripItem,
);

export default router;
