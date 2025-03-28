import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds: number = 10): Promise<string> => {
  return await bcrypt.hash(value, saltRounds);
};

export const compareValue = async (value: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(value, hash);
};