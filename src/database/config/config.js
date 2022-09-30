const config = require("../config/index");

module.exports = {
  development: {
    username: config.PG_USER,
    password: config.PG_PASSWORD,
    database: config.PG_DATABASE,
    host: config.HOST,
    dialect: config.DIALECT,
  },
  test: {
    url: config.TEST_DATABASE_URL,
    dialect: config.DIALECT,
  },
  production: {
    url: config.PROD_DATABASE_URL,
    dialect: config.DIALECT,
  },
};