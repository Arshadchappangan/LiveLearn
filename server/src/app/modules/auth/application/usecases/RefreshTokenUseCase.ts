import { AppError } from "@/app/shared/errors/AppError";
import { JwtService } from "../../infrastructure/services/JwtService";
import { IUserRepository } from "../../domain/repositories/IUserRepository"; 

export class RefreshTokenUseCase {
    constructor(
        private userRepo: IUserRepository,
        private jwtService: JwtService
    ) {}

    async execute(refreshToken: string) {
         
        if(!refreshToken) {
            throw new AppError("Refresh token is required", 401);
        }

        const decoded = this.jwtService.verifyRefreshToken(refreshToken);
        const user = await this.userRepo.findById(decoded.userId);

        if(!user) {
            throw new AppError("User not found", 404);
        }

        const accessToken = this.jwtService.generateAccessToken(user.id);
        return accessToken;
    }
}