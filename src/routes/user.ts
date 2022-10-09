import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/authentication";
import validator from "../middlewares/validator";
import parser from "../middlewares/upload";

import {
  validateSignup, validateLogin, validateProfile, validateEmail, validateAccount
} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const {
  createUser, loginUser, updateProfile, resendOtp, verifyAccount,
  uploadProfilePicture, getAllUsers, getUserByUsername, reset, recover, uploadHeaderPicture
} = UserController;

router.post("/login", validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), createUser);
router.post("/otp/resend", validator(validateEmail), resendOtp);
router.post("/", verifyToken, getUserByUsername);

router.get("/", verifyToken, getAllUsers);

router.patch("/update", verifyToken, validator(validateProfile), updateProfile);
router.patch("/verify", validator(validateAccount), verifyAccount);
router.patch("/profile-picture", verifyToken, parser.single("photo"), uploadProfilePicture);
router.patch("/header-picture", verifyToken, parser.single("header"), uploadHeaderPicture);
router.patch("/recover-account", validator(validateEmail), recover);
router.patch("/reset-password", validator(validateAccount), reset);

export default router;
