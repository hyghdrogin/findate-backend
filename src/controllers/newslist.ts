import { Request, Response } from "express";
import sendEmail from "../utilities/email";
import models from "../models";
import {
  successResponse,
  errorResponse,
  handleError,
} from "../utilities/responses";

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
  static async joinNewslist(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const emailExist = await models.Newslist.findOne({ email });
      if (emailExist) {
        return errorResponse(
          res,
          406,
          "You have registered for the waitlist already."
        );
      }
      const newslist = await models.Newslist.create({ email });
      const subject = "Findate";
      const message =
        "Thanks for joining the newslist, you will be notified of our various news letters";
      await sendEmail(email, subject, message);
      return successResponse(res, 200, "Newslist mail sent", newslist);
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
  static async getAllSubscriber(req: Request, res: Response) {
    try {
      let { page, limit }: any = req.query;
      // eslint-disable-next-line no-mixed-operators
      if (page === undefined || (null && limit === undefined) || null) {
        page = 1;
        limit = 5;
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const subscribers = await models.Newslist.find({})
        .limit(endIndex)
        .skip(startIndex)
        .exec();

      const count = await models.Newslist.countDocuments();
      return successResponse(res, 200, "Newslist mails fetched successfully", {
        total: subscribers.length,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        subscribers,
      });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
