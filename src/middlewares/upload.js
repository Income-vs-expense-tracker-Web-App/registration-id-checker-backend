import multer from "multer";
import path from "path";
import { respond } from "../utils/respond.js";
const storage = multer.memoryStorage();

/**
 * Middleware function to validate the file sizes of uploaded documents and passports.
 *
 * This middleware checks the size of the uploaded files for the "doc" and "passport" fields. If the file size exceeds the maximum allowed size, it will return a 400 Bad Request response with an error message.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export function validateFileSizes(req, res, next) {
  const maxSizeDoc = 2 * 1024 * 1024;
  const maxSizePassport = 5 * 1024 * 1024;

  if (req.files) {
    const doc = req.files["doc"] ? req.files["doc"][0] : null;
    const passport = req.files["passport"] ? req.files["passport"][0] : null;

    if (doc.fileSize > maxSizeDoc) {
      return respond(res, 400, "Doc file exceeds 2MB size limit");
    }
    if (passport.fileSize > maxSizePassport) {
      return respond(res, 400, "Passport file exceeds 5MB size limit");
    }
    next();
  }
}

/**
 * Middleware function to filter the allowed file types for the "doc" and "passport" fields.
 *
 * This middleware checks the file extension and MIME type of the uploaded files for the "doc" and "passport" fields. If the file type is not supported, it will return a 400 Bad Request response with an error message.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} file - The uploaded file object.
 * @param {Function} cb - The callback function to indicate if the file is accepted or rejected.
 */
function fileFilter(req, file, cb) {
  let fileTypes;
  if (file.fieldname === "doc") {
    fileTypes = /pdf|doc|docx/;
  } else if (file.fieldname === "passport") {
    fileTypes = /jpg|png/;
  }

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  }
  return cb(new Error(`Error: file type not supported for ${file.fieldname}`));
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
