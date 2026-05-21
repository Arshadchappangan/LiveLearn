import { Router } from "express";
import { asyncHandler } from "@/app/shared/utils/asyncHandler";
import { authMiddleware } from "@/app/shared/middleware/auth.middleware";
import { uploadAvatarMiddleware } from "@/app/shared/middleware/upload.middleware"
import { userController } from "../..";

const router = Router();

router.get("/profile", authMiddleware, asyncHandler(userController.getProfile.bind(userController)));
router.patch("/profile", authMiddleware, asyncHandler(userController.updateProfile.bind(userController)));
router.patch("/avatar", authMiddleware, uploadAvatarMiddleware.single("avatar"), asyncHandler(userController.uploadAvatar.bind(userController)));

export default router;