import { Destination } from '../../models/Destination.js';

export async function getAllDestinations(req, res) {
  const destinations = await Destination.find({
    isActive: { $ne: false },
  });

  res.json(destinations);
}

export async function getDestinationById(req, res) {
  res.json(req.destination);
}
