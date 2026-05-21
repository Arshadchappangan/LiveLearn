import { AppError } from "@/app/shared/errors/AppError";
import { IUserProfileRepository } from "../../domain/repositories/IUserProfileRepository";
import { CloudinaryService } from "../../infrastructure/services/CloudinaryService";

export class UploadAvatarUseCase {
    constructor(
        private userRepo: IUserProfileRepository,
        private cloudinaryService: CloudinaryService
    ) {}

    async execute(userId: string, file: Express.Multer.File) {

        if(!file) throw new AppError("Image is required", 400);

        const uploadedFile = await this.cloudinaryService.uploadAvatar(file) as any;

        return await this.userRepo.updateAvatar(userId, uploadedFile.secure_url);
    }
}