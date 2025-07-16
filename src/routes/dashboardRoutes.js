import { Router } from "express";
import {
  actualBalance,
  totalIngresos,
  totalEgresos,
} from "../controllers/dashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const dashboardRouter = Router();

dashboardRouter.get("/balance", authMiddleware, actualBalance);
dashboardRouter.get("/ingresos", authMiddleware, totalIngresos);
dashboardRouter.get("/gastos", authMiddleware, totalEgresos);

export default dashboardRouter;
