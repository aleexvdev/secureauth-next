import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../common/utils/AppError";
import { z } from "zod";
import { REFRESH_PATH, clearAuthenticationCookies } from "../common/utils/cookie";

const formatZodError = (res: Response, error: z.ZodError) => {
  const { issues } = error;
  const errorsMessage = issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Valdiation failed",
    errors: errorsMessage,
  })
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.log(`Error ocurred on PATH: ${req.path}`, err);

  if (req.path === REFRESH_PATH) {
    clearAuthenticationCookies(res);
  }

  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "Invalid JSON format, check your request body.", error: err?.message || "Unknown error." });
  }

  if (err instanceof z.ZodError) {
    return formatZodError(res, err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message, error: err.errorCode });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: err?.message || "Unknown error." });
}