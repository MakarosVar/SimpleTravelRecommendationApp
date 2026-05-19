import { Destination } from '../models/Destination.js';

export async function validateDestinationId(req, res, next) {
  const destinationId =
    req.params.destinationId ?? req.body.destinationId;

  if (!destinationId) {
    return next({
      statusCode: 400,
      message: 'Destination id is required',
    });
  }
  const destination = await Destination.findById(destinationId);

  if (!destination) {
    return next({
      statusCode: 404,
      message: 'Destination not found',
    });
  }

  req.destinationId = destinationId;
  req.destination = destination;

  next();
}
