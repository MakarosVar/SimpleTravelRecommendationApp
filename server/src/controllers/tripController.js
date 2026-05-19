import { Trip } from '../models/Trip.js';

function formatTrip(trip) {
  return {
    _id: trip._id,
    destinationId: trip.destination._id,
    note: trip.note,
    priority: trip.priority,
    destination: trip.destination,
  };
}

export async function getAllTrips(req, res) {
  const trips = await Trip.find().populate('destination');

  res.json(trips.map(formatTrip));
}

export async function addTripItem(req, res, next) {
  const destinationId = req.destinationId;

  const alreadyExists = await Trip.exists({
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
  });

  const populatedTrip = await tripItem.populate('destination');

  res.status(201).json(formatTrip(populatedTrip));
}

export async function updateTripItem(req, res, next) {
  const destinationId = req.destinationId;
  const { note, priority } = req.body;

  const tripItem = await Trip.findOne({
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
}

export async function deleteTripItem(req, res, next) {
  const destinationId = req.destinationId;
  const deletedTrip = await Trip.findOneAndDelete({
    destination: destinationId,
  });

  if (!deletedTrip) {
    return next({
      statusCode: 404,
      message: 'Trip item not found',
    });
  }

  res.json({ message: 'Trip item deleted successfully!' });
}
