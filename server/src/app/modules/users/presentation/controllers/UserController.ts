import { Request, Response } from "express";
import { ApiResponse } from "@/app/shared/utils/apiResponse";
import { GetProfileUseCase } from "../../application/useCases/GetProfileUseCase";
import { UpdateProfileUseCase } from "../../application/useCases/UpdateProfileUseCase";

export class UserController {
    constructor(
        private getProfileUseCase: GetProfileUseCase, 
        private updateProfileUseCase: UpdateProfileUseCase
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
}