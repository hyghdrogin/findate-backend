import { Router } from "express";
import AdminController from "../controllers/adminController";
import WaitlistController from "../controllers/waitlistController";
import Authentication from "../middlewares/authentication";
import validator from "../middlewares/validator";
import validateUser from "../validations/adminValidation";
import validateWaitlist from "../validations/waitlistValidation";

const router = Router();
const { activeDeactivateUser } = AdminController;
const { getAllWaitlist } = WaitlistController;
const { verifyToken, verifyAdmin } = Authentication;

router.get("/waitlist", verifyToken, verifyAdmin, validator(validateWaitlist), getAllWaitlist);

router.patch("/users/:userId", verifyToken, verifyAdmin, validator(validateUser), activeDeactivateUser);

export default router;
