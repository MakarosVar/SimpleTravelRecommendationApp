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

router.get('/', protect, asyncHandler(getAllTrips));

router.post(
  '/',
  protect,
  asyncHandler(validateDestinationId),
  asyncHandler(addTripItem),
);

router.patch(
  '/:destinationId',
  protect,
  asyncHandler(validateDestinationId),
  validateTripUpdate,
  asyncHandler(updateTripItem),
);

router.delete(
  '/:destinationId',
  protect,
  asyncHandler(validateDestinationId),
  asyncHandler(deleteTripItem),
);

export default router;
