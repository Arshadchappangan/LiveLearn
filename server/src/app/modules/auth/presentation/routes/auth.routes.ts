import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { asyncHandler } from "@/app/shared/utils/asyncHandler";
import { authMiddleware } from "@/app/shared/middleware/auth.middleware";

const router = Router();

const controller = new AuthController();

router.post("/signup", asyncHandler(controller.signup.bind(controller)));
router.post("/login", asyncHandler(controller.login.bind(controller)));
router.get("/me", authMiddleware, (req, res) => {
    res.json({success: true, user: req.user});
})

export default router;