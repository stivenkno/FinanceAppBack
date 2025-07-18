import { Router } from "express";

const goalRouter = Router();

import { createGoal, goal_aporte } from "../controllers/goalsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

goalRouter.post("/creategoal", authMiddleware, createGoal);
goalRouter.put("/goal_aporte", authMiddleware, goal_aporte);

export default goalRouter;
