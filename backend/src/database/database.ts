import { logger } from "@/common/utils/logger";
import { config } from "@/config/app.config";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

const pool = new Pool({
  user: config.DATABASE.USER,
  host: config.DATABASE.HOST,
  database: config.DATABASE.NAME,
  password: config.DATABASE.PASSWORD.toString(),
  port: Number.parseInt(config.DATABASE.PORT),
  ssl: config.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const setupDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    logger.info("Databa connection established successfully");
    client.release();
  } catch (error) {
    logger.error("Error connecting to the database:", error);
    throw error;
  }
}

export const createDatabase = async (): Promise<void> => {
  const migrationDir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(migrationDir);  
  for (const file of files) {
    const filePath = path.join(migrationDir, file);
    const sql = fs.readFileSync(filePath, "utf8");
    await query(sql);
    logger.info(`Migration ${file} executed successfully`);
  }
}

export const seed = async (): Promise<void> => {
  const seedDir = path.join(__dirname, "seeds");
  const files = fs.readdirSync(seedDir);  
  for (const file of files) {
    const filePath = path.join(seedDir, file);
    const sql = fs.readFileSync(filePath, "utf8");
    await query(sql);
    logger.info(`Seed ${file} executed successfully`);
  }
}

export const query = async (text: string, params: any[] = []): Promise<any> => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug("Executed query:", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    logger.error("Error executing query:", { text, params, error });
    throw error;
  }
}

export const transaction = async <T>(callback: (client: any) => Promise<T>): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Transaction error:", error);
    throw error;
  } finally {
    client.release();
  }
}

export const revertMigrations = async (): Promise<void> => {
  const filePath = path.join(__dirname, "rollback", "revert-migrations.sql");
  const sql = fs.readFileSync(filePath, "utf8");
  try {
    await query(sql);
    logger.info("All migrations reverted successfully");
  } catch (error) {
    logger.error("Error reverting migrations:", error);
    throw error;
  }
}

export default {
  query,
  transaction,
  setupDatabase,
  pool,
}