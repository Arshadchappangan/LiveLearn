import { UserController } from "./presentation/controllers/UserController";
import { UserProfileRepository } from "./infrastructure/repositories/UserProfileRepository"; 
import { GetProfileUseCase } from "./application/useCases/GetProfileUseCase";
import { UpdateProfileUseCase } from "./application/useCases/UpdateProfileUseCase";
import { UploadAvatarUseCase } from "./application/useCases/UploadAvatarUseCase";
import { CloudinaryService } from "./infrastructure/services/CloudinaryService";

const userProfileRepository = new UserProfileRepository()
const cloudinaryService = new CloudinaryService();
const getProfileUseCase = new GetProfileUseCase(userProfileRepository);
const updateProfileUseCase = new UpdateProfileUseCase(userProfileRepository);
const uploadAvatarUseCase = new UploadAvatarUseCase(userProfileRepository, cloudinaryService);

export const userController = new UserController(getProfileUseCase, updateProfileUseCase, uploadAvatarUseCase);