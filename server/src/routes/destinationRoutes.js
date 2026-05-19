import express from 'express';
import {
  getAllDestinations,
  getDestinationById,
} from '../controllers/destinationController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';

const router = express.Router();

router.get('/', getAllDestinations);

router.get(
  '/:destinationId',
  validateDestinationId,
  getDestinationById,
);

export default router;
