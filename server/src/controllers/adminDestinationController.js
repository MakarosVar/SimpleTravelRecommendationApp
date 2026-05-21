import { Destination } from '../models/Destination.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminDestinations = asyncHandler(async (req, res) => {
  const destinations = await Destination.find().sort({
    createdAt: -1,
  });

  res.json(destinations);
});

export const createDestination = async (req, res) => {
  const destination = await Destination.create(req.body);

  res.status(201).json(destination);
};
