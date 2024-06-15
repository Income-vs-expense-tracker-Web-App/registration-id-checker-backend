export function respond(res, statusCode, message, data) {
  const status = statusCode >= 200 && statusCode < 300;
  return res.status(statusCode).json({
    success: status,
    message: message,
    data: data,
  });
}
