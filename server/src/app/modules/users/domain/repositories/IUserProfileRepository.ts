import { UserProfile } from "../entities/UserProfile";
import { UpdateProfileDTO } from "../../application/dto/UpdateProfileDTO";

export interface IUserProfileRepository {
    getProfile(userId: string) : Promise<UserProfile>;
    updateProfile(userId: string, data: UpdateProfileDTO) : Promise<UserProfile>;
}
