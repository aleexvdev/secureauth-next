import { Router } from "express";
import { authController } from "./auth.module";
import { authenticateJwt } from "@/common/strategies/jwt.strategy";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/verify/email", authController.verifyEmail);
authRoutes.post("/password/forgot", authController.forgotPassword);
authRoutes.post("/password/reset", authController.resetPassword);
// authRoutes.get("/refresh", authController.refreshToken);
authRoutes.post("/logout", authenticateJwt, authController.logout);

export default authRoutes;