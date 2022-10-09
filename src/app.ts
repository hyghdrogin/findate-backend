/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import express from "express";
import cors from "cors";
import router from "./routes";
import config from "./config";
import db from "./config/db";
import NewslistController from "./controllers/newslist";
import validator from "./middlewares/validator";
import validateNewslist from "./validations/newslist";

import reqLogger from "./utilities/requestLogger";
import { CustomRequest } from "./utilities/interface";

const app = express();
const port = config.PORT || 5000;

const { joinNewslist } = NewslistController;

app.use(cors());
app.use(express.json());

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}

app.use(reqLogger); // request logger
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Findate app");
});

app.post("/", validator(validateNewslist), joinNewslist);

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct kindly check url.",
}));

(async () => {
  await db.connect();
  app.listen(config.PORT || 4000, async () => {
    console.log(
      `${config.APP_NAME} API listening on ${port || 4000}`
    );
  });
})();

process.on("unhandledRejection", (error: any) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
  //  throw error;
});

export default app;
