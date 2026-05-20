import { UserModel } from "@/app/modules/auth/infrastructure/database/user.model";
import { UserProfile } from "../../domain/entities/UserProfile";
import { IUserProfileRepository } from "../../domain/repositories/IUserProfileRepository";
import { AppError } from "@/app/shared/errors/AppError";

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
}