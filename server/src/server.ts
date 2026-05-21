import "@/config/env";
import "@/types/express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "@modules/auth/presentation/routes/auth.routes";
import userRouter from "@modules/users/presentation/routes/user.routes";

import { errorMiddleware } from "./app/shared/middleware/error.middleware";

import { connectDB } from "./config/database";

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});