import { add } from "date-fns";

export const ON_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const thirtyDaysFromNow = (): Date => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const fortyFiveMinutesFromNow = (): Date => new Date(Date.now() + 45 * 60 * 1000);

export const calculateExpirationDate = (expiresIn: string = "15m"): Date => {
  // Match number + unit (m = minutes, h = hours, d = days)
  const match = expiresIn.match(/^(\d+)([mhd])$/);
  if (!match) throw new Error('Invalid format. Use "15m", "1h", or "2d".');
  const [, value, unit] = match;
  const expirationDate = new Date();
  switch (unit) {
    case "m": // minutes
      return add(expirationDate, { minutes: parseInt(value) });
    case "h": // hours
      return add(expirationDate, { hours: parseInt(value) });
    case "d": // days
      return add(expirationDate, { days: parseInt(value) });
    default:
      throw new Error('Invalid unit. Use "m", "h", or "d".');
  }
};

export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);

export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

export const anHourFromNow = (): Date => new Date(Date.now() + 60 * 60 * 1000);