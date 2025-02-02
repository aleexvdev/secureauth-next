import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { errorHandler } from "./middlewares/errorHandler";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import authRoutes from "./modules/auth/auth.routes";
import connectDB from "./database/database";
import passport from "./middlewares/passport";
import { authenticateJwt } from "./common/strategies/jwt.strategy";
import sessionRoutes from "./modules/session/session.routes";
import mfaRoutes from "./modules/mfa/mfa.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTPSTATUS.OK).json({ message: 'Hello World!' });
}));

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/session`, authenticateJwt, sessionRoutes);
app.use(`${BASE_PATH}/mfa`, authenticateJwt, mfaRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

