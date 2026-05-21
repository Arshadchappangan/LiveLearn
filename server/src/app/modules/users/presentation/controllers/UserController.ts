import { Request, Response } from "express";
import { ApiResponse } from "@/app/shared/utils/apiResponse";
import { GetProfileUseCase } from "../../application/useCases/GetProfileUseCase";
import { UpdateProfileUseCase } from "../../application/useCases/UpdateProfileUseCase";
import { UploadAvatarUseCase } from "../../application/useCases/UploadAvatarUseCase";

export class UserController {
    constructor(
        private getProfileUseCase: GetProfileUseCase, 
        private updateProfileUseCase: UpdateProfileUseCase,
        private uploadAvatarUseCase: UploadAvatarUseCase
    ) {}

    async getProfile(req: Request, res: Response) {
        const user = await this.getProfileUseCase.execute(req.user!.id);
        return res.status(200).json(
            ApiResponse.success(
                user,
                "User profile retrieved successfully"
            )
        )
    }

    async updateProfile(req: Request, res: Response) {
        const user = await this.updateProfileUseCase.execute(req.user!.id, req.body);

        return res.status(200).json(
            ApiResponse.success(
                user,
                "User profile updated successfully"
            )
        )
    }

    async uploadAvatar(req: Request, res: Response) {
        const user = await this.uploadAvatarUseCase.execute(req.user!.id, req.file!);

        return res.status(200).json(
            ApiResponse.success(
                user,
                "Avatar uploaded successfully"
            )
        )
    }
}