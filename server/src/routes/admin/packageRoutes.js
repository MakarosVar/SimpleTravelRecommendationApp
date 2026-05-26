import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { requireAdmin } from '../../middleware/adminMiddleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { validatePackageId } from '../../middleware/validatePackage.js';
import {
  createPackage,
  getAdminPackageById,
  getAdminPackages,
  updatePackage,
} from '../../controllers/admin/packageController.js';

const router = express.Router();
router.get('/packages', protect, requireAdmin, getAdminPackages);
router.post('/packages', protect, requireAdmin, createPackage);
router.get(
  '/packages/:packageId',
  protect,
  requireAdmin,
  asyncHandler(validatePackageId),
  getAdminPackageById,
);
router.patch(
  '/packages/:packageId',
  protect,
  requireAdmin,
  asyncHandler(validatePackageId),
  updatePackage,
);

export default router;
