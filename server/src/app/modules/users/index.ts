import { UserController } from "./presentation/controllers/UserController";
import { UserProfileRepository } from "./infrastructure/repositories/UserProfileRepository"; 
import { GetProfileUseCase } from "./application/useCases/GetProfileUseCase";

const userProfileRepository = new UserProfileRepository()
const getProfileUseCase = new GetProfileUseCase(userProfileRepository);

export const userController = new UserController(getProfileUseCase);