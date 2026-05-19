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

const router = express.Router();

router.get('/', asyncHandler(getAllTrips));

router.post(
  '/',
  asyncHandler(validateDestinationId),
  asyncHandler(addTripItem),
);

router.patch(
  '/:destinationId',
  asyncHandler(validateDestinationId),
  validateTripUpdate,
  asyncHandler(updateTripItem),
);

router.delete(
  '/:destinationId',
  asyncHandler(validateDestinationId),
  asyncHandler(deleteTripItem),
);

export default router;
