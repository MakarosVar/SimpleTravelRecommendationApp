import { Favorite } from '../models/Favorite.js';
import { sendError } from '../utils/sendError.js';

export async function getAllFavorites(req, res) {
  const favorites = await Favorite.find().populate('destination');
  res.json(favorites.map((favorite) => favorite.destination));
}

export async function addFavorite(req, res) {
  const destinationId = req.destinationId;
  const destination = req.destination;

  const alreadyExists = await Favorite.exists({
    destination: destinationId,
  });

  if (alreadyExists) {
    return sendError(
      res,
      409,
      'Destination is already in favorites.',
    );
  }

  await Favorite.create({
    destination: destinationId,
  });

  res.status(201).json(destination);
}

export async function deleteFavorite(req, res) {
  const destinationId = req.destinationId;

  const favorite = await Favorite.findOneAndDelete({
    destination: destinationId,
  });

  if (!favorite) {
    return sendError(res, 404, 'Favorite not found.');
  }

  res.json({ message: 'Favorite removed successfully.' });
}
