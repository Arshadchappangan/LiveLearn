import { UserController } from "./presentation/controllers/UserController";
import { UserProfileRepository } from "./infrastructure/repositories/UserProfileRepository"; 
import { GetProfileUseCase } from "./application/useCases/GetProfileUseCase";
import { UpdateProfileUseCase } from "./application/useCases/UpdateProfileUseCase";

const userProfileRepository = new UserProfileRepository()
const getProfileUseCase = new GetProfileUseCase(userProfileRepository);
const updateProfileUseCase = new UpdateProfileUseCase(userProfileRepository);

export const userController = new UserController(getProfileUseCase, updateProfileUseCase);