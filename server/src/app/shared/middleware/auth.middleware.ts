import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { JwtService } from "@/app/modules/auth/infrastructure/services/JwtService";
import { UserRepository } from "@/app/modules/auth/infrastructure/repositories/UserRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];
    const jwtService = new JwtService();

    const decoded = jwtService.verifyToken(token);

    const user = await new UserRepository().findById(decoded.userId);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    req.user = user;
    next();
}