import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../../database/models/session.model";
import { UserDocument } from "../../database/models/user.model";
import { config } from "../../config/app.config";

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
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