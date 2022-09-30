const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profiles", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    username: {
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
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Profile.associate = models => {
    Profile.belongsTo(models.Users, {
      as: "profiles",
      foreignKey: "userId",
    });
  };
  return Profile;
};