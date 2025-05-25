export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
  ipAddress?: string;
  location?: string;
}

export interface ResetPasswordDto {
  password: string;
  verificationCode: string;
}