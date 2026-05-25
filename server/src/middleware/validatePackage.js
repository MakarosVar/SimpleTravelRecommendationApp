import mongoose from 'mongoose';
import { Package } from '../models/Package.js';

export async function validatePackageId(req, res, next) {
  const packageId = req.params.packageId ?? req.body.packageId;

  if (!packageId) {
    return next({
      statusCode: 400,
      message: 'Package id is required',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(packageId)) {
    return next({
      statusCode: 400,
      message: 'Invalid package id',
    });
  }

  const packageDoc = await Package.findById(packageId);

  if (!packageDoc) {
    return next({
      statusCode: 404,
      message: 'Package not found',
    });
  }

  req.packageId = packageId;
  req.packageDoc = packageDoc;

  next();
}
