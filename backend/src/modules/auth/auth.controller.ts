import { Request, Response } from "express";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { loginSchema, registerSchema } from "@/common/validators/auth.validator";
import { HTTPSTATUS } from "@/config/http.config";
import { AuthService } from "./auth.service";

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
    const { user } = await this.authService.login(body);
    return res.status(HTTPSTATUS.OK).json({
      message: "User login successfully!",
      data: user
    });
  });
}