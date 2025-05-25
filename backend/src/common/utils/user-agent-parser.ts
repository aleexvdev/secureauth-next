import { UAParser } from "ua-parser-js";

export function parseUserAgent(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    browser: result.browser.name || null,
    os: result.os.name || null,
    device: result.device.model || "Desktop",
  };
}