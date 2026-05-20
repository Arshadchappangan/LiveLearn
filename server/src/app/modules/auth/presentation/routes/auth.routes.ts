import { Router } from "express";
import { authController } from "../..";
import { asyncHandler } from "@/app/shared/utils/asyncHandler";
import { authMiddleware } from "@/app/shared/middleware/auth.middleware";
import { roleMiddleware } from "@/app/shared/middleware/role.middleware";

const router = Router();


router.post("/signup", asyncHandler(authController.signup.bind(authController)));
router.post("/login", asyncHandler(authController.login.bind(authController)));
router.post("/refresh-token", asyncHandler(authController.refreshToken.bind(authController)));
router.post("/logout", asyncHandler(authController.logout.bind(authController)));

router.get("/me", authMiddleware, (req, res) => {
    res.json({success: true, user: req.user});
})
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({success: true, message: "Welcome Admin!"});
})
router.get("/instructor", authMiddleware, roleMiddleware("instructor"), (req, res) => {
    res.json({success: true, message: "Welcome Instructor!"});
})
router.get("/mentor", authMiddleware, roleMiddleware("mentor"), (req, res) => {
    res.json({success: true, message: "Welcome Mentor!"});
})


export default router;