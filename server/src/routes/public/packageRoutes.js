import express from 'express';
import {
  getPublicPackageById,
  getPublicPackages,
} from '../../controllers/public/packageController.js';

const router = express.Router();

router.get('/', getPublicPackages);
router.get('/:packageId', getPublicPackageById);

export default router;
