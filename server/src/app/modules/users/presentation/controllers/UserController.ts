import { Request, Response } from "express";
import { ApiResponse } from "@/app/shared/utils/apiResponse";
import { GetProfileUseCase } from "../../application/useCases/GetProfileUseCase";

export class UserController {
    constructor(
        private getProfileUseCase: GetProfileUseCase
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
}