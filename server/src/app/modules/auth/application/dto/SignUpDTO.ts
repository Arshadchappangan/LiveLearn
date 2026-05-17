export interface SignUpDTO {
    name: string;
    email: string;
    password: string;
    role: "learner" | "instructor" | "mentor" | "admin";
}