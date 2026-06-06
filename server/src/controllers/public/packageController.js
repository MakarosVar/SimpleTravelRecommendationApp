import mongoose from 'mongoose';
import { Package } from '../../models/Package.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const getPublicPackages = asyncHandler(async (req, res) => {
  const {
    search = '',
    travelStyle = 'all',
    duration = 'all',
    sort = 'default',
    page = '1',
    limit = '9',
  } = req.query;
  const query = {
    status: 'published',
  };
  if (travelStyle !== 'all') {
    query.travelStyle = travelStyle;
  }

  if (duration !== 'all') {
    query.duration = duration;
  }

  if (search.trim()) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { travelStyle: { $regex: search, $options: 'i' } },
      { duration: { $regex: search, $options: 'i' } },
    ];
  }
  let sortOptions = { createdAt: -1 };

  if (sort === 'title') {
    sortOptions = { title: 1 };
  }

  if (sort === 'newest') {
    sortOptions = { createdAt: -1 };
  }

  if (sort === 'travelStyle') {
    sortOptions = { travelStyle: 1 };
  }
  const filterOptionsQuery = {
    status: 'published',
  };
  const travelStyles = await Package.distinct(
    'travelStyle',
    filterOptionsQuery,
  );

  const durations = await Package.distinct(
    'duration',
    filterOptionsQuery,
  );
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const total = await Package.countDocuments(query);
  const packageDocs = await Package.find(query)
    .populate('destinations')
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);
  res.json({
    items: packageDocs,
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    filters: {
      travelStyles,
      durations,
    },
  });
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
