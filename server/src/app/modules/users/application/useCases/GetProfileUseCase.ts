import { AppError } from "@/app/shared/errors/AppError";
import { IUserProfileRepository } from "../../domain/repositories/IUserProfileRepository";

export class GetProfileUseCase {
    constructor (private userRepo: IUserProfileRepository) {}

    async execute(userId: string) {
        const user  = await this.userRepo.getProfile(userId);

        if(!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }
}