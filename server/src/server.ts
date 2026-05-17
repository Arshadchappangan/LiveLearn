import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "@modules/auth/presentation/routes/auth.routes";

import { connectDB } from "./config/database";


dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});