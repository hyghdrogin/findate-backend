import { Request, Response } from "express";
import bcrypt from "bcrypt";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utilities/responses";
import jwtHelper from "../utilities/jwt";
import { UserInterface, OtpInterface, FilterInterface } from "../utilities/interface";
import sendEmail from "../utilities/email";

const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createUser(req: Request, res: Response) {
    try {
      const {
        username, email, password, retypePassword
      } = req.body;
      const emailExist = await models.User.findOne({ email });
      if (emailExist) {
        return errorResponse(res, 409, "email already registered by another user.");
      }
      const usernameExist = await models.User.findOne({ username });
      if (usernameExist) {
        return errorResponse(res, 409, "Username already registered by another user.");
      }
      if (password !== retypePassword) {
        return errorResponse(res, 409, "Password mismatch.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await models.User.create({
        username, email, password: hashedPassword
      });
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      await models.Otp.create({ email, token: otp });
      const subject = "WELCOME TO FINDATE";
      const message = `Welcome to Findate ${username}, you will need an OTP verification to Proceed. OTP: ${otp}`;
      await sendEmail(email, subject, message);
      return successResponse(res, 201, "Account created successfully, kindly verify your email and login.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user: UserInterface | null = await models.User.findOne({ username });
      if (!user) { return errorResponse(res, 404, "Username does not exist."); }
      if (!user.verified) {
        return errorResponse(res, 409, "Kindly verify your account before logging in.");
      }
      if (user.active !== true) { return errorResponse(res, 403, "Account has been deactivated. Please contact admin."); }
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) { return errorResponse(res, 404, "Password is not correct!."); }
      const { _id, email } = user;
      const token = await generateToken({ _id, username, email });
      const userDetails = {
        _id, username, name: user.name, surname: user.surname, gender: user.gender, location: user.location, occupation: user.occupation, dob: user.dob, role: user.role, photo: user.photo, header: user.header, active: user.active
      };
      return successResponse(
        res,
        200,
        "User Logged in Successfully.",
        { token, userDetails }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async updateProfile(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const {
        name, surname, gender, occupation, location, interest, dob, about
      } = req.body;
      const user = await models.User.findByIdAndUpdate({ _id }, {
        name, surname, gender, occupation, location, interest, dob, about
      }, { new: true }).select("-password");
      return successResponse(
        res,
        200,
        "Profile updated Successfully.",
        user
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async uploadProfilePicture(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const user = await models.User.findByIdAndUpdate(
        _id,
        { photo: req.file?.path },
        { new: true }
      ).select("-password");

      return successResponse(res, 200, "Picture uploaded Successfully.", user);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async uploadHeaderPicture(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const user = await models.User.findByIdAndUpdate(
        _id,
        { header: req.file?.path },
        { new: true }
      ).select("-password");

      return successResponse(res, 200, "Picture uploaded Successfully.", user);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async resendOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user: UserInterface | null = await models.User.findOne({ email });
      if (!user) { return errorResponse(res, 404, "Email does not exist."); }
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      await models.Otp.findOneAndUpdate({ email }, { token: otp, expired: false });
      const subject = "Resend otp";
      const message = `hi, kindly verify your account with this token ${otp}`;
      await sendEmail(email, subject, message);
      return successResponse(
        res,
        201,
        "A token has been sent to your account for verification."
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async verifyAccount(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const otp: OtpInterface | null = await models.Otp.findOne({ token });
      if (!otp) { return errorResponse(res, 404, "Otp does not exist."); }
      if (otp.expired) { return errorResponse(res, 409, "Otp has already been used."); }

      await models.User.findOneAndUpdate({ email: otp.email }, { verified: true });
      await models.Otp.findOneAndUpdate({ email: otp.email }, { expired: true });
      return successResponse(
        res,
        200,
        "Account verified successfully kindly login."
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getAllUsers(req: Request, res: Response) {
    try {
      const { status, role, name } = req.query;
      const filter = {} as FilterInterface;
      status ? filter.verified = status as string : filter.verified = "true";
      role ? filter.role = role as string : filter.role = "user";
      if (name) {
        filter.$text = {
          $search: name as string
        };
      }
      const users = await models.User.find(filter).select("-password");
      return successResponse(
        res,
        200,
        "Users Fetched successfully.",
        { total: users.length, users }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getUserByUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const user = await models.User.findOne({ username }).select("-password");
      if (!user) {
        return errorResponse(res, 404, "User not found.");
      }
      return successResponse(res, 200, "User fetched successfully.", user);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async recover(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await models.User.findOne({ email });
      if (!user) { return errorResponse(res, 404, "Email does not exist."); }
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      await models.Otp.findOneAndUpdate(
        email,
        { token: otp, expired: false },
        { upsert: true }
      );
      const subject = "Reset Password Otp";
      const message = `hi, kindly use this ${otp} to reset your password`;
      await sendEmail(email, subject, message);
      return successResponse(res, 200, "Kindly use the otp in your mail to reset your password.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async reset(req: Request, res: Response) {
    try {
      const { token, password, retypePassword } = req.body;
      const otp = await models.Otp.findOne({ token });
      if (!otp) { return errorResponse(res, 404, "incorrect Otp"); }
      if (password !== retypePassword) {
        return errorResponse(res, 409, "Password mismatch.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await models.User.findOneAndUpdate({ email: otp.email }, { password: hashedPassword });
      return successResponse(res, 200, "Password reset successfully, Kindly login.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async deleteAccount(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      await models.User.findByIdAndDelete({ _id });
      return successResponse(res, 200, "Account deleted successfully, Kindly login.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
