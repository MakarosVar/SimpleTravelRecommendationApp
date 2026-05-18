export function sendError(res, statusCode, message) {
  return res.status(statusCode).json({
    message,
  });
}
