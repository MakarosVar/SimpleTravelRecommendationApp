import { Favorite } from '../models/Favorite.js';

export async function getAllFavorites(req, res) {
  const favorites = await Favorite.find().populate('destination');
  res.json(favorites.map((favorite) => favorite.destination));
}

export async function addFavorite(req, res, next) {
  const destinationId = req.destinationId;
  const destination = req.destination;

  const alreadyExists = await Favorite.exists({
    destination: destinationId,
  });

  if (alreadyExists) {
    return next({
      statusCode: 409,
      message: 'Destination is already in favorites.',
    });
  }

  await Favorite.create({
    destination: destinationId,
  });

  res.status(201).json(destination);
}

export async function deleteFavorite(req, res, next) {
  const destinationId = req.destinationId;

  const favorite = await Favorite.findOneAndDelete({
    destination: destinationId,
  });

  if (!favorite) {
    return next({
      statusCode: 404,
      message: 'Favorite not found.',
    });
  }

  res.json({ message: 'Favorite removed successfully.' });
}
