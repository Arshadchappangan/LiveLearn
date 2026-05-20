import { AuthController } from "./presentation/controllers/AuthController";
import { UserRepository } from "./infrastructure/repositories/UserRepository";
import { JwtService } from "./infrastructure/services/JwtService";
import { SignupUserUseCase } from "./application/usecases/SignupUserUseCase";
import { LoginUserUseCase } from "./application/usecases/LoginUserUseCase";
import { RefreshTokenUseCase } from "./application/usecases/RefreshTokenUseCase";

// Dependency Injection

const userRepository = new UserRepository();
const jwtService = new JwtService();

const signupUseCase = new SignupUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository, jwtService);
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, jwtService);

export const authController = new AuthController(signupUseCase, loginUseCase, refreshTokenUseCase);