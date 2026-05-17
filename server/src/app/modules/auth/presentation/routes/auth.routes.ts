import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const controller = new AuthController();

router.post("/signup", controller.signup);

export default router;