import { config } from "../config/app.config";
import { resend } from "./resendClient";

type Params = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

const mailerSender = config.NODE_ENV === "development"
  ? "no-reply <onboarding@resend.dev>"
  : `no-reply <${config.EMAIL.MAILER_SENDER}>`;

export const sendEmail = async ({
  to,
  from = mailerSender,
  subject,
  text,
  html
}: Params) =>
  await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    text,
    subject,
    html,
  });