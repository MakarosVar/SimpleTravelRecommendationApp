import express from 'express';
import {
  getAllTrips,
  addTripItem,
  updateTripItem,
} from '../controllers/tripController.js';

const router = express.Router();

router.get('/', getAllTrips);
router.post('/', addTripItem);
router.patch('/:destinationId', updateTripItem);

export default router;
