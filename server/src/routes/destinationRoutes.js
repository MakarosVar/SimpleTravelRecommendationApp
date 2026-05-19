import express from 'express';
import {
  getAllDestinations,
  getDestinationById,
} from '../controllers/destinationController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(getAllDestinations));

router.get(
  '/:destinationId',
  asyncHandler(validateDestinationId),
  asyncHandler(getDestinationById),
);

export default router;
