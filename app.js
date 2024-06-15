import express from "express";
import { respond } from "./src/utils/respond.js";
import { globalErrorHandler, notFoundHandler } from "./src/middlewares/error.js";
import { logger } from "./src/utils/logger.js";
import user from "./src/modules/route.js";
import { connectToDatabase } from "./src/utils/database.js";
const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return respond(res, 200, "API is served");
});

app.use('/users', user)

app.use(globalErrorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
