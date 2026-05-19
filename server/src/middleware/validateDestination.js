import { sendError } from '../utils/sendError.js';
import { Destination } from '../models/Destination.js';

export async function validateDestinationId(req, res, next) {
  const destinationId =
    req.params.destinationId ?? req.body.destinationId;

  if (!destinationId) {
    return next(sendError(res, 400, 'Destination id is required'));
  }
  const destination = await Destination.findById(destinationId);

  if (!destination) {
    return next(sendError(res, 404, 'Destination not found'));
  }

  req.destinationId = destinationId;
  req.destination = destination;

  next();
}
