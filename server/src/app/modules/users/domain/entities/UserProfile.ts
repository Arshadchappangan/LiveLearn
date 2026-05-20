export class UserProfile {
    constructor (
        public readonly id: string,
        public name: string,
        public email: string,
        public role: string,
        public avatarUrl: string | null,
        public bio: string | null,
        public isVerified: boolean,
        public createdAt: Date
    ) {}
}