import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.get('/me', protect, getMe);

export default router;
