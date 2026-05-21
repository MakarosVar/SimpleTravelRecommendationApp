import { Destination } from '../models/Destination.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminDestinations = asyncHandler(async (req, res) => {
  const destinations = await Destination.find().sort({
    createdAt: -1,
  });

  res.json(destinations);
});

export const createDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.create(req.body);

  res.status(201).json(destination);
});
export const getAdminDestinationById = asyncHandler(
  async (req, res) => {
    const destination = await Destination.findById(
      req.params.destinationId,
    );

    res.json(destination);
  },
);

export const updateDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(
    req.params.destinationId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  res.json(destination);
});
export const updateDestinationStatus = asyncHandler(
  async (req, res) => {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      res.status(400);
      throw new Error('isActive must be a boolean');
    }

    const destination = req.destination;

    destination.isActive = isActive;

    const updatedDestination = await destination.save();

    res.json(updatedDestination);
  },
);
