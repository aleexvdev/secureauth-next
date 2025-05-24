import { Request, Response } from "express";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { UserService } from "./user.service";
import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode } from "@/common/enums/error-code.enum";
import { BadRequestException } from "@/common/utils/catch-error";

export class UserController {
  constructor(userService: UserService) {
    this.userService = userService;
  }
  private userService: UserService;

  getUserById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const user = await this.userService.findUserById(id);
    return res.status(HTTPSTATUS.OK).json({
      message: "User retrieved successfully",
      data: user,
    });
  });

  updateUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException("User id is required", ErrorCode.BAD_REQUEST);
    }
    const updatedUser = await this.userService.updateUser(Number(id), req.body);
    return res.status(HTTPSTATUS.OK).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  });

  updatePassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException("User id is required", ErrorCode.BAD_REQUEST);
    }
    const updatedUser = await this.userService.updatePassword(Number(id), req.body);
    return res.status(HTTPSTATUS.OK).json({
      message: "Password updated successfully",
      data: updatedUser,
    });
  });

}