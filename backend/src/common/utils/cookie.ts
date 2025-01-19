import { CookieOptions, Response } from "express";
import { config } from "../../config/app.config";
import { calculateExpirationDate } from "./date-time";

type CookiePayloadType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const REFRESH_PATH = `${config.BASE_PATH}/auth/refresh`;

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production" ? true : false,
  sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
};

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiredIn = config.JWT.EXPIRES_IN;
  const expires = calculateExpirationDate(expiredIn);

  return {
    ...defaultCookieOptions,
    expires,
    path: REFRESH_PATH,
  };
}

export const getAccessTokenCookieOptions = (): CookieOptions => {
  const expiredIn = config.JWT.EXPIRES_IN;
  const expires = calculateExpirationDate(expiredIn);

  return {
    ...defaultCookieOptions,
    expires,
    path: "/",
  };
}

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: CookiePayloadType): Response => {
  res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
  res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
  return res;
};

export const removeAuthenticationCookies = (res: Response): Response => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: REFRESH_PATH });
  return res;
};