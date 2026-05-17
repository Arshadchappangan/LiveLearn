import { Request, Response } from "express";
import { SignupUserUseCase } from "../../application/usecases/SignupUserUseCase";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { success } from "zod";

export class AuthController {
    async signup(req: Request, res: Response) {
        const useCase = new SignupUserUseCase(new UserRepository());
        const user = await useCase.execute(req.body);
        res.status(201).json({success: true, data: user});
    }
}