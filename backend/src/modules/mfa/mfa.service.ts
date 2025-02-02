import { Request } from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { BadRequestException, UnauthorizedException } from "../../common/utils/catch-error";

export class MfaService {
  public async generateMfaSetup(req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException("User not autorized");
    }

    if (user.userPreferences.enable2FA) {
      return {
        message: "2FA already enabled",
      }
    }

    let secretKey = user.userPreferences.twoFactorSecret;
    if (!secretKey) {
      const secret = speakeasy.generateSecret({
        name: "SecureAuth",
      });
      secretKey = secret.base32;
      user.userPreferences.twoFactorSecret = secretKey;
      await user.save();
    }
    const url = speakeasy.otpauthURL({
      secret: secretKey,
      label: `${user.name}`,
      issuer: "SecureAuth",
      encoding: "base32",
    });
    const qrImageUrl = await qrcode.toDataURL(url);

    return {
      message: "Scan the QR code or copy the URL to your authenticator app",
      secret: secretKey,
      qrImageUrl,
    };
  }

  public async verifyMfaSetup(req: Request, code: string, secretKey: string) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException("User not autorized");
    }
    if (!user.userPreferences.enable2FA) {
      return {
        message: "2FA not enabled",
        userPreferences: {
          enable2FA: user.userPreferences.enable2FA,
        },
      }
    }
    const isValid = speakeasy.totp.verify({
      secret: secretKey,
      encoding: "base32",
      token: code,
    });
    if (!isValid) {
      throw new BadRequestException("Invalid MFA code. Please try again");
    }
    user.userPreferences.enable2FA = true;
    await user.save();
    return {
      message: "MFA setup completed successfully",
      userPreferences: {
        enable2FA: user.userPreferences.enable2FA,
      }
    };
  }

  public async revokeMfaSetup(req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException("User not autorized");
    }

    if (!user.userPreferences.enable2FA) {
      return {
        message: "2FA not enabled",
        userPreferences: {
          enable2FA: user.userPreferences.enable2FA,
        },
      }
    }

    user.userPreferences.twoFactorSecret = undefined;
    user.userPreferences.enable2FA = false;
    await user.save();

    return {
      message: "MFA revoked successfully",
      userPreferences: {
        enable2FA: user.userPreferences.enable2FA,
      }
    };
  }
}