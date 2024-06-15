import { logger } from "../utils/logger.js";
import { User } from "./model.js";


/**
 * Creates a new user in the database with the provided data.
 *
 * @param {Object} data - The user data to create the new user with.
 * @param {string} data.firstname - The first name of the user.
 * @param {string} data.middlename - The middle name of the user.
 * @param {string} data.lastname - The last name of the user.
 * @param {string} passportUrl - The URL of the user's passport document.
 * @param {string} documentUrl - The URL of the user's CV or other document.
 * @returns {Promise<User>} The newly created user.
 */
async function create(data, passportUrl, documentUrl) {
  try {
    return await User.create({
      firstname: data.firstname,
      middle_name: data.middlename,
      lastname: data.lastname,
      passport_url: passportUrl,
      cv_url: documentUrl,
    });
  } catch (err) {
    logger.error(err.stack);
  }
}


/**
 * Fetches a user from the database by their unique identifier.
 *
 * @param {string} userId - The unique identifier of the user to fetch.
 * @returns {Promise<User>} The fetched user, or undefined if not found.
 */
async function fetchUserById(userId) {
  try {
    return await User.findById(userId);
  } catch (err) {
    logger.error(err.stack);
  }
}

export const repository = {
    create,
    fetchUserById
}
