import { z } from "zod";

export const emailSchema = z.string().email().trim();
export const passwordSchema = z.string().min(6).max(20).trim();
export const verificationCodeSchema = z.string().min(1).max(255).trim();

export const registerSchema = z.object({
  username: z.string().min(3).max(20).trim(),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  userAgent: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});