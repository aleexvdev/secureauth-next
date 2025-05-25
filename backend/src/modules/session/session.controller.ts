import { asyncHandler } from "@/middlewares/asyncHandler";
import { SessionService } from "./session.service";
import { Request, Response } from "express";
import { HTTPSTATUS } from "@/config/http.config";

export class SessionController {
  private sessionService: SessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  getAllSessions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    const { sessions } = await this.sessionService.getAllSessions(Number(userId), sessionId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Sessions retrieved successfully",
      data: sessions,
    });
  });

  getSessionById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.params.sessionId;
    const session = await this.sessionService.getSessionById(Number(userId), Number(sessionId));
    return res.status(HTTPSTATUS.OK).json({
      message: "Session retrieved successfully",
      data: session,
    });
  });

  logoutSession = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const userSessionId = req.sessionId;
    const { sessionId } = req.body;
    await this.sessionService.logoutSession(Number(userId), Number(userSessionId), Number(sessionId));
    return res.status(HTTPSTATUS.OK).json({
      message: "Session logged out successfully",
    });
  });

  logoutAllSessions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    await this.sessionService.logoutAllSessions(Number(userId), Number(sessionId));
    return res.status(HTTPSTATUS.OK).json({
      message: "All sessions logged out successfully",
    });
  });

  getSessionsHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessions = await this.sessionService.getSessionsHistory(Number(userId));
    return res.status(HTTPSTATUS.OK).json({
      message: "Sessions history retrieved successfully",
      data: sessions,
    });
  });

  deleteSessionHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    await this.sessionService.deleteSessionHistory(Number(userId), Number(sessionId));
    return res.status(HTTPSTATUS.OK).json({
      message: "Session history deleted successfully",
    });
  });
}