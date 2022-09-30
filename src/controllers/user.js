const bcrypt = require("bcrypt");
const {
  errorResponse,
  successResponse,
  handleError,
} = require("../utilities/responses");
const {
  registerValidation,
  loginValidation,
  profileValidate,
} = require("../validation/userValidation");
const User = require("../services/user");
const jwtHelper = require("../utilities/jwt");
const sendEmail = require("../utilities/email");

const { generateToken } = jwtHelper;
const {
  emailExist,
  usernameExist,
  createUser,
  updateUserProfile,
  getAllUsers,
  updateUserProfilePicture,
  getUser,
} = User;
/**
 * @class UserController
 * @description create, verify and log in user
 * @exports UserController
 */
module.exports = class UserController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async registerUser(req, res) {
    try {
      const { error } = registerValidation(req.body);
      if (error) {
        return errorResponse(res, 400, "Bad Request");
      }
      const {
        firstName,
        lastName,
        username,
        phone,
        email,
        password,
        gender,
        location,
      } = req.body;
      const Email = email.toLowerCase();
      const Username = username.toLowerCase();
      const EmailExist = await emailExist(Email);
      if (EmailExist) {
        return errorResponse(res, 409, "Email already used by another user.");
      }
      const PhoneExist = await phoneExist(phone);
      if (PhoneExist) {
        return errorResponse(res, 409, "Phone already used by another user.");
      }
      const UsernameExist = await usernameExist(Username);
      if (UsernameExist) {
        return errorResponse(
          res,
          409,
          `Sorry, ${username} is not available. Please pick another username`
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstName,
        lastName,
        phone,
        gender,
        email: Email,
        username: Username,
        password: hashedPassword,
        location,
      };
      const createdUser = await createUser(newUser);
      return successResponse(
        res,
        201,
        "User created Successfully, Kindly log in!",
        createdUser
      );
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req, res) {
    try {
      const { error } = loginValidation(req.body);
      if (error) {
        return errorResponse(res, 400, "Bad Request");
      }
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const user = await emailExist(Email);
      if (!user) {
        return errorResponse(res, 404, "Email does not exist.");
      }
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) {
        return errorResponse(res, 400, "Password is not correct!.");
      }
      let { username, id } = user;
      const token = await generateToken({
        id,
        username,
        email,
      });
      return successResponse(res, 200, "User Logged in Successfully.", token);
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserProfile(req, res) {
    try {
      const { id } = req.user;
      const { error } = profileValidate(req.body);
      if (error) {
        return errorResponse(res, 400, "Bad Request");
      }
      await updateUserProfile(id, req.body);
      return successResponse(res, 200, "User Profile Updated Successfully.");
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserProfilePicture(req, res) {
    try {
      const { id } = req.user;
      if (!req.file) {
        return errorResponse(res, 401, "Please provide an image.");
      }
      await updateUserProfilePicture(id, req.file.path);
      return successResponse(
        res,
        200,
        "User profile picture updated successfully."
      );
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserHeader(req, res) {
    try {
      const { id } = req.user;
      if (!req.file) {
        return errorResponse(res, 401, "Please provide an image.");
      }
      await updateUserHeader(id, req.file.path);
      return successResponse(
        res,
        200,
        "User Header picture updated successfully."
      );
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getUsers(req, res) {
    try {
      const users = await getAllUsers();
      return successResponse(
        res,
        200,
        "Successfully retrieved all Users",
        users
      );
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getUserById(req, res) {
    try {
      const { id } = req.user;
      const user = await getUser(id);
      if (!user) {
        return errorResponse(res, 404, "User not Found.");
      }
      return successResponse(res, 200, "Successfully retrieved User", user);
    } catch (error) {
      handleError(err, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
};
