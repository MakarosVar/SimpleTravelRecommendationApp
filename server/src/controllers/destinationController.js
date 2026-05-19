import { destinations } from '../data/destinations.js';

export function getAllDestinations(req, res) {
  res.json(destinations);
}

export function getDestinationById(req, res) {
  res.json(req.destination);
}
