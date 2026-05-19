import { Request, Response } from "express";
import { ApiResponse } from "@/app/shared/utils/apiResponse";
import { SignupUserUseCase } from "../../application/usecases/SignupUserUseCase";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

export class AuthController {
    async signup(req: Request, res: Response) {
        const useCase = new SignupUserUseCase(new UserRepository());
        const user = await useCase.execute(req.body);

        return res.status(201).json(
            ApiResponse.success(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                    createdAt: user.createdAt,
                },
                "User registered successfully"
            )
        );
    }
}