import fs from "fs";
import path from "path";
import { logger } from "../../utils/logger.js";
import { randomUUID } from "crypto";



/**
 * Uploads a file to the local file system and returns the relative path to the uploaded file.
 *
 * @param {Object} file - The file object to be uploaded.
 * @param {string} file.originalname - The original name of the file.
 * @param {Buffer} file.buffer - The buffer containing the file data.
 * @returns {Promise<string>} - The relative path to the uploaded file.
 */
export async function uploadFile(file) {
  try {
    const uploadDir = path.join("src/services/upload", "store");
    const fileExtension = file?.originalname.split(".").pop().toLowerCase();
    const newFileName = `${randomUUID().toString()}.${fileExtension}`;
    const filePath = path.join(uploadDir, newFileName);
    await fs.promises.mkdir(uploadDir, { recursive: true });
    await fs.promises.writeFile(filePath, file.buffer);
    return `/store/${newFileName}`;
  } catch (err) {
    logger.error(err.stack);
  }
}
