import { Destination } from '../../models/Destination.js';
import { Trip } from '../../models/Trip.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import mongoose from 'mongoose';

async function validateDestinationIds(destinationIds = []) {
  if (!Array.isArray(destinationIds)) {
    throw {
      statusCode: 400,
      message: 'destinationIds must be an array',
    };
  }

  if (destinationIds.length === 0) {
    throw {
      statusCode: 400,
      message: 'A trip must contain at least one destination',
    };
  }

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

  return uniqueDestinationIds;
}

function formatTrip(trip) {
  return {
    _id: trip._id,
    title: trip.title,
    description: trip.description,
    items: trip.items,
    createdAt: trip.createdAt,
    updatedAt: trip.updatedAt,
  };
}

export const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ user: req.user._id })
    .populate('items.destination')
    .sort({ createdAt: -1 });

  res.json(trips.map(formatTrip));
});

export const createTrip = asyncHandler(async (req, res) => {
  const { title, description, destinationIds = [] } = req.body;

  if (!title?.trim()) {
    throw {
      statusCode: 400,
      message: 'Trip title is required',
    };
  }

  const uniqueDestinationIds =
    await validateDestinationIds(destinationIds);

  const trip = await Trip.create({
    user: req.user._id,
    title: title.trim(),
    description: description?.trim() || '',
    items: uniqueDestinationIds.map((destinationId, index) => ({
      destination: destinationId,
      note: '',
      priority: 'medium',
      order: index,
    })),
  });

  const populatedTrip = await Trip.findById(trip._id).populate(
    'items.destination',
  );

  res.status(201).json(formatTrip(populatedTrip));
});

export const getTripById = asyncHandler(async (req, res, next) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return next({
      statusCode: 400,
      message: 'Invalid trip id',
    });
  }

  const trip = await Trip.findOne({
    _id: tripId,
    user: req.user._id,
  }).populate('items.destination');

  if (!trip) {
    return next({
      statusCode: 404,
      message: 'Trip not found',
    });
  }

  res.json(formatTrip(trip));
});

export const updateTrip = asyncHandler(async (req, res, next) => {
  const { tripId } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return next({
      statusCode: 400,
      message: 'Invalid trip id',
    });
  }

  const trip = await Trip.findOne({
    _id: tripId,
    user: req.user._id,
  });

  if (!trip) {
    return next({
      statusCode: 404,
      message: 'Trip not found',
    });
  }

  if (title !== undefined) trip.title = title.trim();
  if (description !== undefined)
    trip.description = description.trim();

  await trip.save();

  const populatedTrip = await Trip.findById(trip._id).populate(
    'items.destination',
  );

  res.json(formatTrip(populatedTrip));
});

export const deleteTrip = asyncHandler(async (req, res, next) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return next({
      statusCode: 400,
      message: 'Invalid trip id',
    });
  }

  const deletedTrip = await Trip.findOneAndDelete({
    _id: tripId,
    user: req.user._id,
  });

  if (!deletedTrip) {
    return next({
      statusCode: 404,
      message: 'Trip not found',
    });
  }

  res.json({ message: 'Trip deleted successfully' });
});

export const addTripItem = asyncHandler(async (req, res, next) => {
  const { tripId } = req.params;
  const { destinationId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return next({
      statusCode: 400,
      message: 'Invalid trip id',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    return next({
      statusCode: 400,
      message: 'Invalid destination id',
    });
  }

  const trip = await Trip.findOne({
    _id: tripId,
    user: req.user._id,
  });

  if (!trip) {
    return next({
      statusCode: 404,
      message: 'Trip not found',
    });
  }

  const alreadyExists = trip.items.some(
    (item) => item.destination.toString() === destinationId,
  );

  if (alreadyExists) {
    return next({
      statusCode: 409,
      message: 'Destination is already in this trip',
    });
  }

  trip.items.push({
    destination: destinationId,
    note: '',
    priority: 'medium',
    order: trip.items.length,
  });

  await trip.save();

  const populatedTrip = await Trip.findById(trip._id).populate(
    'items.destination',
  );

  res.status(201).json(formatTrip(populatedTrip));
});
export const updateTripItem = asyncHandler(async (req, res, next) => {
  const { tripId, destinationId } = req.params;
  const { note, priority } = req.body;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return next({
      statusCode: 400,
      message: 'Invalid trip id',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    return next({
      statusCode: 400,
      message: 'Invalid destination id',
    });
  }

  if (
    priority !== undefined &&
    !['low', 'medium', 'high'].includes(priority)
  ) {
    return next({
      statusCode: 400,
      message: 'Invalid priority',
    });
  }

  const trip = await Trip.findOne({
    _id: tripId,
    user: req.user._id,
  });

  if (!trip) {
    return next({
      statusCode: 404,
      message: 'Trip not found',
    });
  }

  const item = trip.items.find(
    (item) => item.destination.toString() === destinationId,
  );

  if (!item) {
    return next({
      statusCode: 404,
      message: 'Trip item not found',
    });
  }

  if (note !== undefined) item.note = note;
  if (priority !== undefined) item.priority = priority;

  await trip.save();

  const populatedTrip = await Trip.findById(trip._id).populate(
    'items.destination',
  );

  res.json(formatTrip(populatedTrip));
});

export const deleteTripItem = asyncHandler(async (req, res, next) => {
  const { tripId, destinationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return next({
      statusCode: 400,
      message: 'Invalid trip id',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    return next({
      statusCode: 400,
      message: 'Invalid destination id',
    });
  }

  const trip = await Trip.findOne({
    _id: tripId,
    user: req.user._id,
  });

  if (!trip) {
    return next({
      statusCode: 404,
      message: 'Trip not found',
    });
  }

  const originalLength = trip.items.length;

  trip.items = trip.items.filter(
    (item) => item.destination.toString() !== destinationId,
  );

  if (trip.items.length === originalLength) {
    return next({
      statusCode: 404,
      message: 'Trip item not found',
    });
  }

  trip.items.forEach((item, index) => {
    item.order = index;
  });

  await trip.save();

  const populatedTrip = await Trip.findById(trip._id).populate(
    'items.destination',
  );

  res.json(formatTrip(populatedTrip));
});
