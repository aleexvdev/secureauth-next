import { Request, Response } from "express";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { UserService } from "./user.service";
import { HTTPSTATUS } from "@/config/http.config";

export class UserController {
  constructor(userService: UserService) {
    this.userService = userService;
  }
  private userService: UserService;

  getUserById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    return res.status(HTTPSTATUS.OK).json({
      message: "User retrieved successfully",
      data: user,
    });
  });
}