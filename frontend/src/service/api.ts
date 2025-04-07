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

export const loginMutationFn = async (data: Logintype) => await API.post("/auth/login", data);
export const registerMutationFn = async (data: RegisterType) => await API.post("/auth/register", data);