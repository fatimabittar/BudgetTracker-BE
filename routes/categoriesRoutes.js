import express from "express";
import {
  createCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

// POST /api/budgets
router.post("/", createCategory);

// GET /api/budgets/user/:userId
router.get("/category/:userId", getCategoriesByUser);

// PUT /api/budgets/:budgetId
router.put("/:categoryId", updateCategory);

// DELETE /api/budgets/:budgetId
router.delete("/:categoryId", deleteCategory);

export default router;
