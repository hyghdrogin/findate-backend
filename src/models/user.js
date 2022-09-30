const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  User.associate = models => {
    User.hasOne(models.Profiles, {
      as: "profiles",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
  }
  return User;
};