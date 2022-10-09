import { Router } from "express";
import AdminController from "../controllers/admin";
import NewslistController from "../controllers/newslist";
import Authentication from "../middlewares/authentication";
import validator from "../middlewares/validator";
import validateUser from "../validations/admin";
import validateNewslist from "../validations/newslist";

const router = Router();
const { activeDeactivateUser } = AdminController;
const { getAllSubscriber } = NewslistController;
const { verifyToken, verifyAdmin } = Authentication;

router.get("/newslist", verifyToken, verifyAdmin, validator(validateNewslist), getAllSubscriber);

router.patch("/users/:userId", verifyToken, verifyAdmin, validator(validateUser), activeDeactivateUser);

export default router;
