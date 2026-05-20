import { Request, Response } from "express";
import { ApiResponse } from "@/app/shared/utils/apiResponse";
import { SignupUserUseCase } from "../../application/usecases/SignupUserUseCase";
import { LoginUserUseCase } from "../../application/usecases/LoginUserUseCase";
import { RefreshTokenUseCase } from "../../application/usecases/RefreshTokenUseCase";

export class AuthController {

    constructor(
        private signupUseCase: SignupUserUseCase,
        private loginUseCase: LoginUserUseCase,
        private refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    async signup(req: Request, res: Response) {

        const user = await this.signupUseCase.execute(req.body);

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

        const result = await this.loginUseCase.execute(req.body);

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

        const accessToken = await this.refreshTokenUseCase.execute(refreshToken);

        return res.status(200).json(
            ApiResponse.success(
                { accessToken },
                "Access token refreshed successfully"
            )
        )
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })

        return res.status(200).json(
            ApiResponse.success(null, "User logged out successfully")
        )
    }
}