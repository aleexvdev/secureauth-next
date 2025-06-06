import { Router } from "express";
import { userController } from "./user.module";
import { authenticateJwt } from "@/common/strategies/jwt.strategy";

const userRoutes = Router();

userRoutes.get("/:id", authenticateJwt, userController.getUserById);
userRoutes.put("/:id", authenticateJwt, userController.updateUser);
userRoutes.put("/:id/password", authenticateJwt, userController.updatePassword);

export default userRoutes;