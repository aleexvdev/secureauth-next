import { Request, Response } from "express";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationEmailSchema } from "@/common/validators/auth.validator";
import { HTTPSTATUS } from "@/config/http.config";
import { AuthService } from "./auth.service";
import { NotFoundException, UnauthorizedException } from "@/common/utils/catch-error";
import { clearAuthenticationCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthenticationCookies } from "@/common/utils/cookie";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userAgent = req.headers["user-agent"];
    const body = registerSchema.parse({ ...req.body, userAgent });
    const { user } = await this.authService.register(body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully!",
      data: user
    });
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userAgent = req.headers["user-agent"];
    const body = loginSchema.parse({ ...req.body, userAgent });
    const { user, accessToken, refreshToken } = await this.authService.login(body);
    return setAuthenticationCookies({ res, accessToken, refreshToken }).status(HTTPSTATUS.OK).json({
      message: "User login successfully!",
      data: user
    });
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<any> => {
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

  verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { code } = verificationEmailSchema.parse(req.body);
    await this.authService.verifyEmail(code);
    return res.status(HTTPSTATUS.OK).json({
      message: "Email verified successfully",
    });
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const email = emailSchema.parse(req.body.email);
    await this.authService.forgotPassword(email);
    return res.status(HTTPSTATUS.OK).json({
      message: "Password reset email sent successfully",
    });
  });

  resetPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const body = resetPasswordSchema.parse(req.body);
    await this.authService.resetPassword(body);
    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: "Password reset successfully",
    });
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const sessionId = req.sessionId;
    console.log(sessionId, "Session ID");
    if (!sessionId) {
      throw new NotFoundException("Session is invalid.");
    }
    await this.authService.logout(sessionId);
    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: "Logged out successfully",
    });
  });
}