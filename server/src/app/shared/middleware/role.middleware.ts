import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { UserRole } from "@/app/modules/auth/domain/entities/User";

export const roleMiddleware = (...allowedRoles: UserRole[]) => 
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError("Unauthorized", 401));
        }

        const hasPermission = allowedRoles.includes(req.user.role);

        if (!hasPermission) {
            return next(new AppError("Forbidden", 403));
        }

        next();
    }