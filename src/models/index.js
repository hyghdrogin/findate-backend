const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../database/config/index");

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";

// const config = require(`${__dirname}/../database/config/config.js`)[env];
const db = {};
let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.PG_DATABASE,
    config.PG_USER,
    config.PG_PASSWORD,
    {
      host: config.HOST,
      dialect:  config.DIALECT
    },
    config
  );
}
fs.readdirSync(__dirname)
  .filter(
    file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;