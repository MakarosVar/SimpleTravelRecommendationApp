import express from 'express';
import {
  createTrip,
  getTripById,
  getTrips,
  addTripItem,
  updateTripItem,
  deleteTripItem,
  updateTrip,
  deleteTrip,
  createTripFromPackage,
} from '../../controllers/user/tripController.js';
import { protect } from '../../middleware/authMiddleware.js';
import { validatePackageId } from '../../middleware/validatePackage.js';

const router = express.Router();
router.get('/', protect, getTrips);
router.post('/', protect, createTrip);
router.post(
  '/from-package/:packageId',
  protect,
  validatePackageId,
  createTripFromPackage,
);
router.get('/:tripId', protect, getTripById);
router.patch('/:tripId', protect, updateTrip);
router.delete('/:tripId', protect, deleteTrip);
router.post('/:tripId/items', protect, addTripItem);
router.patch(
  '/:tripId/items/:destinationId',
  protect,
  updateTripItem,
);
router.delete(
  '/:tripId/items/:destinationId',
  protect,
  deleteTripItem,
);
export default router;
