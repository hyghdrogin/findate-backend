import { Request, Response } from "express";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utilities/responses";

/**
 * @class AdminController
 * @description create, get, delete, update Admin
 * @exports AdminController
 */
export default class AdminController {
  /**
      * @param {object} req - The reset request object
      * @param {object} res - The reset errorResponse object
      * @returns {object} Success message
      */
  static async activeDeactivateUser(req: Request, res: Response) {
    try {
      const { type } = req.query;
      const { userId } = req.params;
      const user = models.User.findById(userId);
      if (!user) { return errorResponse(res, 404, "User not found"); }
      let value;
      type === "activate" ? value = true : value = false;
      const userData = await models.User.findByIdAndUpdate(userId, { active: value }, { new: true }).select("-password");
      return successResponse(res, 200, "User active status updated.", userData);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
