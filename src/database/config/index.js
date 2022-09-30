const { isEmpty } = require("lodash");
const logger = require("pino");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_DATABASE: process.env.PG_DATABASE,
  HOST: process.env.HOST,
  url: process.env.url,
  DIALECT: process.env.DIALECT,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
  JWT_KEY: process.env.JWT_KEY,
  APP_NAME: process.env.APP_NAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

module.exports = config;
