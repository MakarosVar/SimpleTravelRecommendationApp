import { Favorite } from '../../models/Favorite.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const getAllFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({
    user: req.user._id,
  }).populate('destination');

  res.json(
    favorites.map((favorite) => favorite.destination).filter(Boolean),
  );
});

export const addFavorite = asyncHandler(async (req, res, next) => {
  const destinationId = req.destinationId;
  const destination = req.destination;

  const alreadyExists = await Favorite.exists({
    user: req.user._id,
    destination: destinationId,
  });

  if (alreadyExists) {
    return next({
      statusCode: 409,
      message: 'Destination is already in favorites.',
    });
  }

  try {
    await Favorite.create({
      user: req.user._id,
      destination: destinationId,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next({
        statusCode: 409,
        message: 'Destination is already in favorites.',
      });
    }

    throw error;
  }

  res.status(201).json(destination);
});

export const deleteFavorite = asyncHandler(async (req, res, next) => {
  const destinationId = req.destinationId;

  const favorite = await Favorite.findOneAndDelete({
    user: req.user._id,
    destination: destinationId,
  });

  if (!favorite) {
    return next({
      statusCode: 404,
      message: 'Favorite not found.',
    });
  }

  res.json({ message: 'Favorite removed successfully.' });
});
