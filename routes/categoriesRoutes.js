import express from "express";
import {
  createCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post("/", createCategory);
router.get("/user", getCategoriesByUser);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
