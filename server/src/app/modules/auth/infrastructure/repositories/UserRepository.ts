import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserModel } from "../database/user.model";

export class UserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const createdUser = await UserModel.create(user)
        return new User(
            createdUser.id,
            createdUser.name,
            createdUser.email,
            createdUser.password,
            createdUser.role,
            createdUser.isVerified,
            createdUser.createdAt
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);

        if (!user) return null;

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.isVerified,
            user.createdAt
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email });

        if (!user) return null;

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.isVerified,
            user.createdAt
        );
    }
}