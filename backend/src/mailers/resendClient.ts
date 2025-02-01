import { Resend } from "resend";
import { config } from "../config/app.config";

export const resend = new Resend(config.EMAIL.RESEND_API_KEY);
