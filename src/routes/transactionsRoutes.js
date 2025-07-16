import { Router } from "express";

const transactionsRouter = Router();

import {
  createTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactionsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

transactionsRouter.post(
  "/createtransaction",
  authMiddleware,
  createTransaction
);
transactionsRouter.get("/gettransactions", authMiddleware, getTransactions);
transactionsRouter.put("/updatetransaction", authMiddleware, updateTransaction);

export default transactionsRouter;
