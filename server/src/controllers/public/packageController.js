import mongoose from 'mongoose';
import { Package } from '../../models/Package.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const getPublicPackages = asyncHandler(async (req, res) => {
  const packageDocs = await Package.find({ status: 'published' })
    .populate('destinations')
    .sort({ createdAt: -1 });

  res.json(packageDocs);
});

export const getPublicPackageById = asyncHandler(async (req, res) => {
  const { packageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(packageId)) {
    throw {
      statusCode: 400,
      message: 'Invalid package id',
    };
  }

  const packageDoc = await Package.findOne({
    _id: packageId,
    status: 'published',
  }).populate('destinations');

  if (!packageDoc) {
    throw {
      statusCode: 404,
      message: 'Package not found',
    };
  }

  res.json(packageDoc);
});
