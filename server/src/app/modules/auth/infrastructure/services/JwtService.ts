import jwt from "jsonwebtoken";

export class JwtService {

    generateAccessToken (userId : string) {
        return jwt.sign(
            { userId}, 
            process.env.JWT_SECRET_KEY!,
            { expiresIn : "1h" }
        )
    }
}