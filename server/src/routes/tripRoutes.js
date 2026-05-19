import express from 'express';
import {
  getAllTrips,
  addTripItem,
  updateTripItem,
  deleteTripItem,
} from '../controllers/tripController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';
import { validateTripUpdate } from '../middleware/validateTripUpdate.js';

const router = express.Router();

router.get('/', getAllTrips);
router.post('/', validateDestinationId, addTripItem);
router.patch(
  '/:destinationId',
  validateDestinationId,
  validateTripUpdate,
  updateTripItem,
);
router.delete(
  '/:destinationId',
  validateDestinationId,
  deleteTripItem,
);

export default router;
