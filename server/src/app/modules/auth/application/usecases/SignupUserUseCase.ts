import bcrypt from "bcrypt";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { SignUpDTO } from "../dto/SignUpDTO";
import { User } from "../../domain/entities/User"; 

export class SignupUserUseCase {
    constructor (private userRepo: IUserRepository) {}

    async execute (data: SignUpDTO) : Promise<User> {

        // Check if user with the same email already exists
        const existingUser = await this.userRepo.findByEmail(data.email);
        if(existingUser) {
            throw new Error("User with this email already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create new user entity
        const newUser = new User(
            crypto.randomUUID(), // Generate unique ID for the user
            data.name,
            data.email,
            hashedPassword,
            data.role
        )

        // Save the user to the repository
        const createdUser = await this.userRepo.create(newUser);
        return createdUser;
    }
}