import { destinations } from '../data/destinations.js';

export function getAllDestinations(req, res) {
  res.json(destinations);
}

export function getDestinationById(req, res) {
  const id = Number(req.params.id);

  const destination = destinations.find(
    (destination) => destination.id === id,
  );

  if (!destination) {
    return sendError(res, 404, 'Destination not found.');
  }

  res.json(destination);
}
