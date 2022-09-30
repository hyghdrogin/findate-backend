"use strict";
const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Profiles");
  }
};