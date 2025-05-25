import { Router } from "express";
import { sessionController } from "./session.module";
import { authenticateJwt } from "@/common/strategies/jwt.strategy";

const sessionRoutes = Router();

sessionRoutes.get("/", authenticateJwt, sessionController.getAllSessions);
sessionRoutes.get("/history", authenticateJwt, sessionController.getSessionsHistory);
sessionRoutes.delete("/history/delete", authenticateJwt, sessionController.deleteSessionHistory);
sessionRoutes.get("/:sessionId", authenticateJwt, sessionController.getSessionById);
sessionRoutes.post("/logout", authenticateJwt, sessionController.logoutSession);
sessionRoutes.post("/logout-all", authenticateJwt, sessionController.logoutAllSessions);

export default sessionRoutes;
