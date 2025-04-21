import { logger } from "@/common/utils/logger";
import { setupDatabase, query } from "@/database/database";
import fs from "fs";
import path from "path";

const seedData = async () => {
  const seedFiles = [
    "001_seed_roles.sql",
    "002_seed_permissions.sql",
    "003_seed_role_permissions.sql",
    "004_seed_mfa_types.sql",
  ];
  try {
    await setupDatabase();
    for (const file of seedFiles) {
      const filePath = path.join(__dirname, "../database/seeds", file);
      const sql = fs.readFileSync(filePath, "utf8");
      await query(sql);
      logger.info(`Seeded data from ${file}`);
    }
    logger.info("Seeding completed successfully.");
  } catch (error) {
    logger.error("Error seeding data:", error);
  }
};

seedData();