import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { MfaService } from "./mfa.service";
import { HTTPSTATUS } from "../../config/http.config";
import { verifyMfaForLoginSchema, verifyMfaSchema } from "../../common/validators/mfa.validator";
import { setAuthenticationCookies } from "../../common/utils/cookie";

export class MfaController {
  private mfaService: MfaService;

  constructor(mfaService: MfaService) {
    this.mfaService = mfaService;
  }

  public generateMfaSetup = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { secret, qrImageUrl, message } = await this.mfaService.generateMfaSetup(req);

    return res.status(HTTPSTATUS.OK).json({
      message,
      secret,
      qrImageUrl,
    });
  });

  public verifyMfaSetup = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { code, secretKey } = verifyMfaSchema.parse({
      ...req.body,
    });
    const { message, userPreferences } = await this.mfaService.verifyMfaSetup(req, code, secretKey);

    return res.status(HTTPSTATUS.OK).json({
      message,
      userPreferences,
    });
  });

  public revokeMfaSetup = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { message, userPreferences } = await this.mfaService.revokeMfaSetup(req);

    return res.status(HTTPSTATUS.OK).json({
      message,
      userPreferences,
    });
  });

  public verifyMfaForLogin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { code, email, userAgent } = verifyMfaForLoginSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });
    const { user, accessToken, refreshToken } = await this.mfaService.verifyMfaForLogin(code, email, userAgent);

    return setAuthenticationCookies({ res, accessToken, refreshToken }).status(HTTPSTATUS.OK).json({
      message: "Verified and logged in successfully",
      user,
    });
  });
}