import { Router } from "express";
import AdminController from "../controllers/adminController";
import Authentication from "../middlewares/authentication";
import validator from "../middlewares/validator";
import validateUser from "../validations/adminValidation";

const router = Router();
const { activeDeactivateUser } = AdminController;
const { verifyToken, verifyAdmin } = Authentication;

router.patch("/users/:userId", verifyToken, verifyAdmin, validator(validateUser), activeDeactivateUser);

export default router;
