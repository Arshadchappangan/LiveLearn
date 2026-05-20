import { Request, Response } from "express";
import { ApiResponse } from "@/app/shared/utils/apiResponse";
import { SignupUserUseCase } from "../../application/usecases/SignupUserUseCase";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { LoginUserUseCase } from "../../application/usecases/LoginUserUseCase";
import { JwtService } from "../../infrastructure/services/JwtService";
import { RefreshTokenUseCase } from "../../application/usecases/RefreshTokenUseCase";

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

    async login(req: Request, res: Response) {
        const useCase = new LoginUserUseCase(new UserRepository(), new JwtService());
        const result = await useCase.execute(req.body);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(200).json(
            ApiResponse.success(
                {
                    user: result.user,
                    accessToken: result.accessToken
                },
                "User logged in successfully"
            )
        )
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;
        const useCase = new RefreshTokenUseCase(new UserRepository(), new JwtService());
        const accessToken = await useCase.execute(refreshToken);

        return res.status(200).json(
            ApiResponse.success(
                { accessToken },
                "Access token refreshed successfully"
            )
        )
    }
}