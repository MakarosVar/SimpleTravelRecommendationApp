import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const requireAdmin = asyncHandler((req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }

  next();
});
