export function errorHandler(error, req, res, next) {
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || 'Internal server error',
  });
}
