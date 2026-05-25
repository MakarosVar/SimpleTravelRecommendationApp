import { Destination } from '../models/Destination.js';
import { Package } from '../models/Package.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

async function validateDestinationIds(destinationIds = []) {
  if (destinationIds === undefined) return;

  if (!Array.isArray(destinationIds)) {
    throw {
      statusCode: 400,
      message: 'Destinations must be an array',
    };
  }
  if (!destinationIds.length) return;

  const hasInvalidId = destinationIds.some(
    (id) => !mongoose.Types.ObjectId.isValid(id),
  );

  if (hasInvalidId) {
    throw {
      statusCode: 400,
      message: 'Invalid destination id',
    };
  }

  const uniqueDestinationIds = [...new Set(destinationIds)];

  const existingCount = await Destination.countDocuments({
    _id: { $in: uniqueDestinationIds },
  });

  if (existingCount !== uniqueDestinationIds.length) {
    throw {
      statusCode: 400,
      message: 'One or more destinations do not exist',
    };
  }
}

function buildPackagePayload(body) {
  const allowedFields = [
    'title',
    'description',
    'destinations',
    'status',
  ];

  const payload = {};

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
}

export const getAdminPackages = asyncHandler(async (req, res) => {
  const packageDocs = await Package.find();
  res.json(packageDocs);
});

export const createPackage = asyncHandler(async (req, res) => {
  const payload = buildPackagePayload(req.body);

  await validateDestinationIds(payload.destinations);

  const packageDoc = await Package.create(payload);

  res.status(201).json(packageDoc);
});

export const getAdminPackageById = asyncHandler(async (req, res) => {
  res.json(req.packageDoc);
});

export const updatePackage = asyncHandler(async (req, res) => {
  const payload = buildPackagePayload(req.body);
  await validateDestinationIds(payload.destinations);
  const packageDoc = await Package.findByIdAndUpdate(
    req.params.packageId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  res.json(packageDoc);
});
