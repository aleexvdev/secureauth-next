import { getEnv } from "@/common/utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "8000"),
  CORS: {
    CORS_ORIGIN: getEnv("CORS_ORIGIN", "http://localhost:8000"),
    BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  },
  DATABASE: {
    HOST: getEnv("DB_HOST", "localhost"),
    PORT: getEnv("DB_PORT", "5432"),
    USER: getEnv("DB_USER", "postgres"),
    PASSWORD: getEnv("DB_PASSWORD"),
    NAME: getEnv("DB_NAME"),
  },
  JWT: {
    SECRET: getEnv("JWT_SECRET", "secret"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15min"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "jwt_refresh_secret_key"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
  },
  APP_CONFIG: {
    NAME: getEnv("APP_NAME", "MyApp"),
    VERSION: getEnv("APP_VERSION", "1.0.0"),
    DESCRIPTION: getEnv("APP_DESCRIPTION", "MyApp Description"),
  },
  ADMIN: {
    ADMIN_EMAIL: getEnv("ADMIN_EMAIL", "admin@example.com"),
    ADMIN_PASSWORD: getEnv("ADMIN_PASSWORD", "admin123"),
  },
  EMAIL: {
    MAILER_SENDER: getEnv("MAILER_SENDER"),
    RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  }
});

export const config = appConfig();