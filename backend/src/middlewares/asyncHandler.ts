import { NextFunction, Request, Response } from "express";

type AsyncControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (controller: AsyncControllerType): AsyncControllerType =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller(req, res, next);
      if (result instanceof Promise) {
        result.catch(next);
      }
    } catch (error) {
      next(error);
    }
  };