import express from "express";
import { getCurrentAmountInWallet, getExpenseCategories, getExpensesPerDay, getTotalBudgetsAndSpentAmount } from "../controllers/reportController.js";

const router = express.Router();

// GET /api/reports/user/:userId/budgets-spent
router.get("/user/:userId/budgets-spent", getTotalBudgetsAndSpentAmount);


// GET /api/reports/user/:userId/expenses-per-day
router.get("/user/:userId/expenses-per-day", getExpensesPerDay);

// GET /api/reports/user/:userId/expenses-categories
router.get("/user/:userId/expenses-categories", getExpenseCategories);

// GET /api/reports/user/:userId/wallet-amount
router.get("/user/:userId/wallet-amount", getCurrentAmountInWallet);




export default router;
