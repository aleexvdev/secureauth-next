import { logger } from "@/common/utils/logger";
import { config } from "@/config/app.config";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

const pool = new Pool({
  user: config.DATABASE.USER,
  host: config.DATABASE.HOST,
  database: config.DATABASE.NAME,
  password: config.DATABASE.PASSWORD,
  port: Number.parseInt(config.DATABASE.PORT),
  ssl: config.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const runMigration = async (filePath: string) => {
  const sql = fs.readFileSync(filePath, "utf8");
  await pool.query(sql);
  logger.info(`Migration executed: ${filePath}`);
};

const migrate = async () => {
  try {
    const migrationDir = path.join(__dirname, "../database/migrations");
    const files = fs.readdirSync(migrationDir).sort();
    for (const file of files) {
      const filePath = path.join(migrationDir, file);
      await runMigration(filePath);
    }
    logger.info("All migrations executed successfully.");
  } catch (error) {
    logger.error("Error during migrations:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

migrate();