import { Router } from "express";
import { asyncHandler } from "@/app/shared/utils/asyncHandler";
import { authMiddleware } from "@/app/shared/middleware/auth.middleware";
import { userController } from "../..";

const router = Router();

router.get("/profile", authMiddleware, asyncHandler(userController.getProfile.bind(userController)));

export default router;