import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import {
  createDestination,
  getAdminDestinations,
} from '../controllers/adminDestinationController.js';

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
export default router;
