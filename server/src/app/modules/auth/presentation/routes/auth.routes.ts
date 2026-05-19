import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { asyncHandler } from "@/app/shared/utils/asyncHandler";

const router = Router();

const controller = new AuthController();

router.post("/signup", asyncHandler(controller.signup.bind(controller)));

export default router;