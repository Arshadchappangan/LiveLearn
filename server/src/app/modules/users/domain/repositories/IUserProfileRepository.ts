import { UserProfile } from "../entities/UserProfile";

export interface IUserProfileRepository {
    getProfile(userId: string) : Promise<UserProfile>;
}