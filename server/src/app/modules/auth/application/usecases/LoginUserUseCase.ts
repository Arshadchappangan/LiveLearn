import { AppError } from "@/app/shared/errors/AppError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { JwtService } from "../../infrastructure/services/JwtService";
import { LoginDTO } from "../dto/LoginDTO";

import bcrypt from "bcrypt";

export class LoginUserUseCase {
    constructor(private userRepo: IUserRepository, private jwtService: JwtService) {}

    async execute (data: LoginDTO) {
        const user = await this.userRepo.findByEmail(data.email);

        if(!user) {
            throw new AppError("User not found", 404);
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if(!isPasswordValid) {
            throw new AppError("Password is incorrect", 401);
        }

        const accessToken = this.jwtService.generateAccessToken(user.id);
        const refreshToken = this.jwtService.generateRefreshToken(user.id);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
            accessToken,
            refreshToken
        }
    }
}