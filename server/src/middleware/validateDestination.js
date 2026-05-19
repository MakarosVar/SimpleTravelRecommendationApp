import { sendError } from '../utils/sendError.js';
import { destinations } from '../data/destinations.js';

export function validateDestinationId(req, res, next) {
  const destinationId = Number(
    req.params.destinationId ?? req.body.destinationId,
  );

  if (!destinationId) {
    return next(sendError(res, 400, 'Destination id is required'));
  }

  const destination = destinations.find(
    (d) => d.id === destinationId,
  );

  if (!destination) {
    return next(sendError(res, 404, 'Destination not found'));
  }

  req.destinationId = destinationId;
  req.destination = destination;

  next();
}
