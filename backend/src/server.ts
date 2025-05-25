import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { logger } from "./common/utils/logger";
import sequelize from "./database/database";
import { asyncHandler } from "./middlewares/asyncHandler";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler";
import passport from "./middlewares/passport";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import sessionRoutes from "./modules/session/session.routes";

const app = express();
const BASE_URL = config.CORS.CORS_ORIGIN;
const BASE_PATH = config.CORS.BASE_PATH;
const PORT = config.PORT;

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(cors({
  origin: config.CORS.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(helmet());
app.use(cookieParser());
app.use(passport.initialize());
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Welcome SecureAuth!!!",
    });
  })
);
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, userRoutes);
app.use(`${BASE_PATH}/session`, sessionRoutes);
app.use(errorHandler);

const startServer = async () => {
  try {
    sequelize
      .authenticate()
      .then(() => {
        logger.info("Connected to the database");
        return sequelize.sync({ force: false });
      })
      .then(() => {
        app.listen(PORT, () => {
          logger.info(`Server is running on port ${PORT}`);
          logger.info(`Base path is ${BASE_URL}${BASE_PATH}`);
        });
      })
      .catch((error) => {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
      });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();