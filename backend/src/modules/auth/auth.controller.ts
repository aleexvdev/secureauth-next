import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationEmailSchema } from "../../common/validators/auth.validator";
import { getAccessTokenCookieOptions, getRefreshTokenCookieOptions, clearAuthenticationCookies, setAuthenticationCookies } from "../../common/utils/cookie";
import { NotFoundException, UnauthorizedException } from "../../common/utils/catch-error";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(async (req: Request, res: Response): Promise<any> => {

    const userAgent = req.headers["user-agent"];
    const body = registerSchema.parse({
      ...req.body,
      userAgent,
    });
    const { user } = await this.authService.register(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully!",
      data: user
    });
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<any> => {

    const userAgent = req.headers["user-agent"];
    const body = loginSchema.parse({
      ...req.body,
      userAgent,
    });

    const { user, accessToken, refreshToken, mfaRequired } = await this.authService.login(body);
    if (mfaRequired) {
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "Verify MFA authentication",
        mfaRequired,
        user
      });
    }

    return setAuthenticationCookies({
      res,
      accessToken,
      refreshToken,
    }).status(HTTPSTATUS.OK).json({
      message: "User login successfully!",
      user
    });
  });

  public refreshToken = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies.refreshToken as string | undefined;
    const userAgent = req.headers["user-agent"];

    if (!token) {
      throw new UnauthorizedException("Missing refresh token");
    }

    const { accessToken, newRefreshToken } = await this.authService.refreshToken(token);

    if (newRefreshToken) {
      res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
    }

    return res.status(HTTPSTATUS.OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({
      message: "Token refreshed successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      }
    });
  });

  public verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { code } = verificationEmailSchema.parse(req.body);
    await this.authService.verifyEmail(code);
    return res.status(HTTPSTATUS.OK).json({
      message: "Email verified successfully",
    });
  });

  public forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const email = emailSchema.parse(req.body.email);
    await this.authService.forgotPassword(email);
    return res.status(HTTPSTATUS.OK).json({
      message: "Password reset email sent successfully",
    });
  });

  public resetPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const body = resetPasswordSchema.parse(req.body);
    await this.authService.resetPassword(body);

    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: "Password reset successfully",
    });
  });

  public logout = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const sessionId = req.sessionId;
    if (!sessionId) {
      throw new NotFoundException("Session not found");
    }
    await this.authService.logout(sessionId);
    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: "Logged out successfully",
    });
  });
}