import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Security & utility middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "API is running", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/accounts", accountRoutes);
app.use("/api", transactionRoutes);

// Error handlers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
