import { favoriteIds } from '../data/favorites.js';
import { destinations } from '../data/destinations.js';
import { sendError } from '../utils/sendError.js';

export function getAllFavorites(req, res) {
  const favorites = destinations.filter((destination) =>
    favoriteIds.includes(destination.id),
  );

  res.json(favorites);
}
export function addFavorite(req, res) {
  const { destinationId } = req.body;

  const destinationExists = destinations.some(
    (destination) => destination.id === destinationId,
  );
  if (!destinationExists) {
    return sendError(res, 404, 'Destination not found.');
  }

  if (favoriteIds.includes(destinationId)) {
    return sendError(
      res,
      409,
      'Destination is already in favorites.',
    );
  }

  favoriteIds.push(destinationId);
  const favorite = destinations.find(
    (destination) => destination.id === destinationId,
  );

  res.status(201).json(favorite);
}

export function deleteFavorite(req, res) {
  const destinationId = Number(req.params.destinationId);

  const favoriteIndex = favoriteIds.findIndex(
    (id) => id === destinationId,
  );

  if (favoriteIndex === -1) {
    return sendError(res, 404, 'Favorite not found.');
  }

  favoriteIds.splice(favoriteIndex, 1);

  res.json({ message: 'Favorite removed successfully.' });
}
