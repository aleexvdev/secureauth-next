/* import { Router } from "express";
import { authenticateJwt } from "../../common/strategies/jwt.strategy";
import { mfaController } from "./mfa.module";

const mfaRoutes = Router();

mfaRoutes.get("/setup", authenticateJwt, mfaController.generateMfaSetup);
mfaRoutes.post("/verify", authenticateJwt, mfaController.verifyMfaSetup);
mfaRoutes.put("/revoke", authenticateJwt, mfaController.revokeMfaSetup);
mfaRoutes.post("/verify-login", authenticateJwt, mfaController.verifyMfaForLogin);

export default mfaRoutes; */