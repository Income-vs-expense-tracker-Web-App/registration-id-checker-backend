import Joi from "joi";
import { respond } from "../utils/respond.js";
import { logger } from "../utils/logger.js";

/**
 * Global error handler middleware that logs errors and responds with appropriate error messages.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */
export function globalErrorHandler(err, req, res, next) {
  logger.error(err.stack);
  if (err instanceof Joi.ValidationError) {
    return respond(res, 400, err.details[0].message);
  }
  return respond(res, 500, "Internal Server");
}

/**
 * Middleware that responds with a 404 "Route not found" error when a requested route is not found.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */
export function notFoundHandler(req, res, next) {
  return respond(res, 404, "Route not found");
}
