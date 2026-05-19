import { sendError } from '../utils/sendError.js';

const allowedPriorities = ['low', 'medium', 'high'];

export function validateTripUpdate(req, res, next) {
  const allowedFields = ['note', 'priority'];
  const receivedFields = Object.keys(req.body);

  if (receivedFields.length === 0) {
    return sendError(res, 400, 'At least one field is required.');
  }

  const hasInvalidField = receivedFields.some(
    (field) => !allowedFields.includes(field),
  );

  if (hasInvalidField) {
    return sendError(res, 400, 'Invalid update fields.');
  }
  const { note, priority } = req.body;

  if (note !== undefined && typeof note !== 'string') {
    return sendError(res, 400, 'Note must be a string.');
  }

  if (
    priority !== undefined &&
    !allowedPriorities.includes(priority)
  ) {
    return sendError(
      res,
      400,
      'Priority must be low, medium, or high.',
    );
  }

  next();
}
