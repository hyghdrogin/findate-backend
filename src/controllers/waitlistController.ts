import { Request, Response } from "express";
import sendEmail from "../utilities/email";
import models from "../models/indexModel";
import { successResponse, errorResponse, handleError } from "../utilities/responses";

/**
 * @class WaitlistController
 * @description join and get Waitlist
 * @exports WaitlistController
 */
export default class WaitlistController {
  /**
      * @param {object} req - The reset request object
      * @param {object} res - The reset errorResponse object
      * @returns {object} Success message
      */
  static async joinWaitlist(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const waitlist = await models.Waitlist.create({ email });
      const subject = "Findate";
      const message = "Thanks for joining the waitlist, you get a link in your mail when we fully launch";
      await sendEmail(email, subject, message);
      return successResponse(res, 200, "Waitlist mail sent", waitlist);
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
  static async getAllWaitlist(req: Request, res: Response) {
    try {
      const people = await models.Waitlist.find();
      return successResponse(res, 200, "Waitlist mails fetched successfully", { total: people.length, people });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
