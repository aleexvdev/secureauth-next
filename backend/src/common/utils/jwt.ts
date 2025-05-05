import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { config } from "../../config/app.config";
import User from "@/database/models/user.model";
import Session from "@/database/models/session.model";

export type AccessTokenPayload = {
  userId: User["id"];
  sessionId: Session["id"];
};

export type RefreshTokenPayload = {
  sessionId: Session["id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaultOptions: SignOptions = {
  audience: ["user"],
}

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN,
  secret: config.JWT.SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET,
};

export const signJwtToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaultOptions,
    ...opts,
  });
}

export const verifyJwtToken = <TokenPayload extends object = AccessTokenPayload>(token: string, options?: VerifyOptions & { secret: string }) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaultOptions,
      ...opts,
    }) as TokenPayload;
    return {
      payload,
      isValid: true,
    };
  } catch (error: any) {
    return {
      error,
      isValid: false,
    };
  }
}