import { isEmpty } from "lodash";
import logger from "pino";
import dotenv from "dotenv";

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL as string,
  JWT_KEY: process.env.JWT_KEY as string,
  APP_NAME: process.env.APP_NAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  SECRET: process.env.SECRET as string,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,
  CLIENT_SECRET: process.env.CLIENT_SECRET as string,
  CLIENT_ID: process.env.CLIENT_ID as string,
  CALLBACK_URL: process.env.CALLBACK_URL
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

export default config;
