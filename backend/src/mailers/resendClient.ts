import { config } from "@/config/app.config";
import { Resend } from "resend";

export const resend = new Resend(config.EMAIL.RESEND_API_KEY);
