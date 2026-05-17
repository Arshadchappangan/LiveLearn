export type UserRole = "learner" | "instructor" | "mentor" | "admin";

export class User {
    constructor (
        public readonly id : string,
        public name : string,
        public email : string,
        public password : string,
        public role : UserRole,
        public isVerified : boolean = false,
        public createdAt : Date = new Date(),
    ) {}
}