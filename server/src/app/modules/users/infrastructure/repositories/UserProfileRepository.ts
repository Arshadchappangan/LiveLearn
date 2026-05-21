import { UserModel } from "@/app/modules/auth/infrastructure/database/user.model";
import { UserProfile } from "../../domain/entities/UserProfile";
import { IUserProfileRepository } from "../../domain/repositories/IUserProfileRepository";
import { AppError } from "@/app/shared/errors/AppError";
import { UpdateProfileDTO } from "../../application/dto/UpdateProfileDTO";

export class UserProfileRepository implements IUserProfileRepository {
    async getProfile(userId: string): Promise<UserProfile> {
        
        const user = await UserModel.findById(userId);

        if(!user) throw new AppError("User not found", 404);

        return new UserProfile(
            user.id,
            user.name,
            user.email,
            user.role,
            user.avatarUrl || null,
            user.bio || null,
            user.isVerified,
            user.createdAt
        )
    }

    async updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserProfile> {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            data,
            { new: true }
        )

        if(!updatedUser) throw new AppError("User not found", 404);

        return new UserProfile(
            updatedUser.id,
            updatedUser.name,
            updatedUser.email,
            updatedUser.role,
            updatedUser.avatarUrl || null,
            updatedUser.bio || null,
            updatedUser.isVerified,
            updatedUser.createdAt
        )
    }
    
}