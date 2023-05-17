import express from "express";
import {
  createBudget,
  getBudgetsByUser,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

// POST /api/budgets
router.post("/", createBudget);

// GET /api/budgets/user/:userId
router.get("/user/:userId", getBudgetsByUser);

// PUT /api/budgets/:budgetId
router.put("/:budgetId", updateBudget);

// DELETE /api/budgets/:budgetId
router.delete("/:budgetId", deleteBudget);

export default router;
