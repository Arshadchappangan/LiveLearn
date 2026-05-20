import type { User } from "@/app/modules/auth/domain/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
