import { Router } from "express";

const goalRouter = Router();

import {
  getGoals,
  createGoal,
  contributeToGoal,
  deleteGoal,
} from "../controllers/goalsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

goalRouter.get("/getgoals", authMiddleware, getGoals);
goalRouter.post("/creategoal", authMiddleware, createGoal);
goalRouter.put("/goal_aporte", authMiddleware, contributeToGoal);
goalRouter.delete("/deletegoal", authMiddleware, deleteGoal);

export default goalRouter;
