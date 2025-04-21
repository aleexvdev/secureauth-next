import { revertMigrations } from "@/database/database";

const revertData = async () => {
  try {
    await revertMigrations();
  } catch (error) {
    console.error("Error reverting migrations:", error);
  }
};

revertData();