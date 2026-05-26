import { Trip } from '../../models/Trip.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
function formatTrip(trip) {
  if (!trip.destination) {
    return null;
  }

  return {
    _id: trip._id,
    destinationId: trip.destination._id,
    note: trip.note,
    priority: trip.priority,
    destination: trip.destination,
  };
}

export const getAllTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).populate(
    'destination',
  );

  res.json(trips.map(formatTrip).filter(Boolean));
});

export const addTripItem = asyncHandler(async (req, res, next) => {
  const destinationId = req.destinationId;

  const alreadyExists = await Trip.exists({
    user: req.user._id,
    destination: destinationId,
  });

  if (alreadyExists) {
    return next({
      statusCode: 409,
      message: 'Destination is already in trip.',
    });
  }

  const tripItem = await Trip.create({
    destination: destinationId,
    note: '',
    priority: 'medium',
    user: req.user._id,
  });

  const populatedTrip = await tripItem.populate('destination');

  res.status(201).json(formatTrip(populatedTrip));
});

export const updateTripItem = asyncHandler(async (req, res, next) => {
  const destinationId = req.destinationId;
  const { note, priority } = req.body;

  const tripItem = await Trip.findOne({
    user: req.user._id,
    destination: destinationId,
  });

  if (!tripItem) {
    return next({
      statusCode: 404,
      message: 'Trip item not found',
    });
  }

  if (note !== undefined) tripItem.note = note;
  if (priority !== undefined) tripItem.priority = priority;
  await tripItem.save();

  const populatedTrip = await tripItem.populate('destination');

  res.json(formatTrip(populatedTrip));
});

export const deleteTripItem = asyncHandler(async (req, res, next) => {
  const destinationId = req.destinationId;
  const deletedTrip = await Trip.findOneAndDelete({
    user: req.user._id,
    destination: destinationId,
  });

  if (!deletedTrip) {
    return next({
      statusCode: 404,
      message: 'Trip item not found',
    });
  }

  res.json({ message: 'Trip item deleted successfully!' });
});
