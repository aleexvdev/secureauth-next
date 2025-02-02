import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { MfaService } from "./mfa.service";
import { HTTPSTATUS } from "../../config/http.config";
import { verifyMfaSchema } from "../../common/validators/mfa.validator";

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
}