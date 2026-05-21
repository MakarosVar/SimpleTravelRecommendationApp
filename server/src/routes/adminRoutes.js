import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import {
  createDestination,
  getAdminDestinationById,
  getAdminDestinations,
  updateDestination,
  updateDestinationStatus,
} from '../controllers/adminDestinationController.js';
import { validateDestinationId } from '../middleware/validateDestination.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get(
  '/destinations',
  protect,
  requireAdmin,
  getAdminDestinations,
);
router.post(
  '/destinations',
  protect,
  requireAdmin,
  createDestination,
);
router.get(
  '/destinations/:destinationId',
  protect,
  requireAdmin,
  asyncHandler(validateDestinationId),
  getAdminDestinationById,
);

router.patch(
  '/destinations/:destinationId',
  protect,
  requireAdmin,
  asyncHandler(validateDestinationId),
  updateDestination,
);

router.patch(
  '/destinations/:destinationId/status',
  protect,
  requireAdmin,
  asyncHandler(validateDestinationId),
  updateDestinationStatus,
);
export default router;
