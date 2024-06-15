import { uploadFile } from "../services/upload/localStorage.js";
import { respond } from "../utils/respond.js";
import { repository } from "./repository.js";
import { createUserSchema, findUserSchema } from "./schema.js";

/**
 * Creates a new user in the system.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the user data.
 * @param {Object} req.files - The uploaded files, including the passport and document files.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 */
export async function createUser(req, res, next) {
  try {
    const validatedData = await createUserSchema.validateAsync(req.body);
    const [passportUrl, documentUrl] = await Promise.all([
      uploadFile(req.files["doc"][0]),
      uploadFile(req.files["passport"][0]),
    ]);
    const newUser = await repository.create(
      validatedData,
      passportUrl,
      documentUrl
    );
    return respond(res, 201, "User created succesfully", { user: newUser });
  } catch (err) {
    next(err);
  }
}

/**
 * Fetches a user by their registration ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The request parameters containing the registration ID.
 * @param {string} req.params.registrationId - The registration ID of the user to fetch.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves with the fetched user, or a 404 response if the user is not found.
 */
export async function getUser(req, res, next) {
  try {
    const params = await findUserSchema.validateAsync(req.params);
    const existingUser = await repository.fetchUserById(params.registrationId);
    if (!existingUser) return respond(res, 404, "User not found");
    return respond(res, 200, "User found", { user: existingUser });
  } catch (err) {
    next(err);
  }
}
