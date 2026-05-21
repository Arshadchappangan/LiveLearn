import { AppError } from "@/app/shared/errors/AppError";
import { IUserProfileRepository } from "../../domain/repositories/IUserProfileRepository";
import { UpdateProfileDTO } from "../dto/UpdateProfileDTO";

export class UpdateProfileUseCase {
    constructor(private userRepo: IUserProfileRepository) {}

    async execute(userId: string, data: UpdateProfileDTO) {

        const user = await this.userRepo.getProfile(userId);

        if(!user) {
            throw new AppError("User not found", 404);
        }

        const updatedProfile = await this.userRepo.updateProfile(userId, data);

        return updatedProfile;  
    }

}