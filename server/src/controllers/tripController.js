import { trips } from '../data/trips.js';
import { destinations } from '../data/destinations.js';
import { sendError } from '../utils/sendError.js';

export function getAllTrips(req, res) {
  const enrichedTrips = trips
    .map((tripItem) => {
      const destination = destinations.find(
        (destination) => destination.id === tripItem.destinationId,
      );

      return {
        ...tripItem,
        destination,
      };
    })
    .filter((tripItem) => tripItem.destination);

  res.json(enrichedTrips);
}

export function addTripItem(req, res) {
  const destinationId = req.destinationId;

  const alreadyExists = trips.some(
    (item) => item.destinationId === destinationId,
  );

  if (alreadyExists) {
    return sendError(res, 409, 'Destination is already in trip.');
  }

  const newTripItem = {
    destinationId,
    note: '',
    priority: 'medium',
  };

  trips.push(newTripItem);

  res.status(201).json(newTripItem);
}

export function updateTripItem(req, res) {
  const destinationId = req.destinationId;
  const { note, priority } = req.body;

  const tripItem = trips.find(
    (item) => item.destinationId === destinationId,
  );

  if (!tripItem) {
    return sendError(res, 404, 'Trip item not found.');
  }

  if (note !== undefined) tripItem.note = note;
  if (priority !== undefined) tripItem.priority = priority;

  res.json(tripItem);
}

export function deleteTripItem(req, res) {
  const destinationId = req.destinationId;

  const tripIndex = trips.findIndex(
    (item) => item.destinationId === destinationId,
  );

  if (tripIndex === -1) {
    return sendError(res, 404, 'Trip item not found.');
  }

  trips.splice(tripIndex, 1);
  res
    .status(200)
    .json({ message: 'Trip item deleted successfully!' });
}
