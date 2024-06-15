import mongoose from "mongoose";
import { logger } from "./logger.js";
import { config } from "./config.js";

export async function connectToDatabase() {
    try {
      await mongoose.connect(config.DATABASE_URL);
      logger.info("Database connection established successfully");
    } catch (err) {
      logger.error("Error connecting to database", err);
    }
  }