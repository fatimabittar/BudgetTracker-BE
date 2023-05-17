import express from "express";
import {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
const router = express.Router();

// POST /api/transactions
router.post("/", createTransaction);

// GET /api/transactions/user/:userId
router.get("/user/:userId", getTransactionsByUser);

// PUT /api/transactions/:transactionId
router.put("/:transactionId", updateTransaction);

// DELETE /api/transactions/:transactionId
router.delete("/:transactionId", deleteTransaction);

export default router;
