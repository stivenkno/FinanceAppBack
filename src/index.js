import express from "express";
import cors from "cors";
import "./config/config.js";
import dotenv from "dotenv";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRouter from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import transactionsRouter from "./routes/transactionsRoutes.js";
import goalRouter from "./routes/goalRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/dashboard", authMiddleware, dashboardRouter);
app.use("/api/transactions", authMiddleware, transactionsRouter);
app.use("/api/goals", authMiddleware, goalRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
