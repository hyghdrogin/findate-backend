import { Router } from "express";
import userRoutes from "./user";
import adminRoutes from "./admin";
import googleRoutes from "./google";

const router = Router();

router.use("/users", userRoutes);
router.use("/admins", adminRoutes);
router.use("/google", googleRoutes);

export default router;
