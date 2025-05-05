import { UserAttributes } from "@/database/models/user.model";
import "express";

declare global {
  namespace Express {
    interface User extends UserAttributes {}
    interface Request {
      sessionId?: string;
    }
  }
}

export {};