import API from "@/lib/axios-client";

type Logintype = {
  email: string;
  password: string;
}

type RegisterType = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

type ForgotPasswordType = {
  email: string;
}

type ResetPasswordType = {
  password: string;
  verifyCode: string;
}

export const loginMutationFn = async (data: Logintype) => await API.post("/auth/login", data);
export const registerMutationFn = async (data: RegisterType) => await API.post("/auth/register", data);
export const forgotPasswordMutationFn = async (data: ForgotPasswordType) => await API.post("/auth/password/forgot", data);
export const resetPasswordMutationFn = async (data: ResetPasswordType) => await API.post("/auth/password/reset", data);