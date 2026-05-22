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
import { uploadDestinationImage } from '../middleware/uploadMiddleware.js';

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
router.post(
  '/uploads/destination-image',
  protect,
  requireAdmin,
  uploadDestinationImage.single('image'),
  (req, res) => {
    res.status(201).json({
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/destinations/${req.file.filename}`,
    });
  },
);
export default router;
