const allowedPriorities = ['low', 'medium', 'high'];

export function validateTripUpdate(req, res, next) {
  const allowedFields = ['note', 'priority'];
  const receivedFields = Object.keys(req.body);

  if (receivedFields.length === 0) {
    return next({
      statusCode: 400,
      message: 'At least one field is required.',
    });
  }

  const hasInvalidField = receivedFields.some(
    (field) => !allowedFields.includes(field),
  );

  if (hasInvalidField) {
    return next({
      statusCode: 400,
      message: 'Invalid update fields.',
    });
  }
  const { note, priority } = req.body;

  if (note !== undefined && typeof note !== 'string') {
    return next({
      statusCode: 400,
      message: 'Note must be a string.',
    });
  }

  if (
    priority !== undefined &&
    !allowedPriorities.includes(priority)
  ) {
    return next({
      statusCode: 400,
      message: 'Priority must be low, medium, or high.',
    });
  }

  next();
}
