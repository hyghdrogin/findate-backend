import { Router } from "express";
import userRoutes from "./user";
import adminRoutes from "./admin";

const router = Router();

router.use("/users", userRoutes);
router.use("/admins", adminRoutes);

export default router;
