const database = require("../models");
const {
  errorResponse,
  handleError,
} = require("../utilities/responses");

/**
 * @class User
 * @description User services
 * @exports User
 */
module.exports = class User {
  /**
   * @param {string} username - The user name
   * @returns {object} - An instance of the Users model class
   */
  static async usernameExist(username) {
    try {
      const usernameExist = await database.Users.findOne({
        where: {
          username,
        },
      });
      return usernameExist;
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @returns {object} An instance of the comment class
   */
  static async getAllUsers() {
    try {
      //
      return await database.Users.findAll({
        include: [
          { model: database.Profiles, as: "profiles" },
        ],
      });
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {string} id  - The user id
   * @returns {object} An instance of the comment class
   */
  static async getUser(id) {
    try {
      //
      return await database.Users.findOne({
        where: {
          id,
        },
        include: [
          { model: database.Profiles, as: "profiles" },
        ],
      });
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {string} email  - The user email
   * @returns {object} - An instance of the Users model class
   */
  static async emailExist(email) {
    try {
      return await database.Users.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {string} id  - The user id
   * @returns {object} - An instance of the Users model class
   */
  static async userExist(id) {
    try {
      return await database.Users.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} newUser - The user details
   * @returns {object} - An instance of the Users model class
   */
  static async createUser(newUser) {
    try {
      const createUser = await database.Users.create(newUser);
      const userToUpdate = await database.Users.findOne({
        where: {
          id: createUser.id,
        },
      });
      if (userToUpdate) {
        const newProfile = {
          userId: userToUpdate.id,
        };
        await database.Profiles.create(newProfile);
        return createUser;
      }
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {string} id - The user id
   * @param {string} profile - The user profile details
   * @returns {object} - An instance of the Profile model class
   */
  static async updateUserProfile(id, profile) {
    try {
      return await database.Profiles.update(profile, {
        where: { userId: id },
        returning: true,
        plain: true,
      });
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {string} id - The user id
   * @param {string} profile - The user profile picture details
   * @returns {object} - An instance of the Profile model class
   */
  static async updateUserProfilePicture(id, profile) {
    try {
      return await database.Profiles.update(
        { profilePicture: profile },
        {
          where: { userId: id },
          returning: true,
          plain: true,
        }
      );
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error");
    }
  }
};
