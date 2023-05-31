import mongoose from "mongoose";
import Category from "../models/category.js";
import User from "../models/user.js";


// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, type, userId, color, icon } = req.body;
    const newCategory = new Category({
      name,
      type,
      userId,
      color,
      icon,
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get all categories for a user
const getCategoriesByUser = async (req, res) => {
  try {
    const { userId, type } = req.query;

    const currentDate = new Date();
    const startOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
    const endOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));

    const categories = await Category.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type,
        },
      },
      {
        $lookup: {
          from: "budgets",
          let: { categoryId: "$_id", startOfMonth, endOfMonth },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$categoryId", "$$categoryId"] },
                    { $gte: ["$startDate", "$$startOfMonth"] },
                    { $lte: ["$endDate", "$$endOfMonth"] },
                  ],
                },
              },
            },
          ],
          as: "budgets",
        },
      },
      {
        $addFields: {
          categoryHasBudget: { $gt: [{ $size: "$budgets" }, 0] },
        },
      },
      {
        $lookup: {
          from: "transactions",
          let: { categoryId: "$_id", startOfMonth, endOfMonth },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$categoryId", "$$categoryId"] },
                    { $gte: ["$date", "$$startOfMonth"] },
                    { $lte: ["$date", "$$endOfMonth"] },
                  ],
                },
              },
            },
          ],
          as: "transactions",
        },
      },
      {
        $addFields: {
          categoryHasTransaction: { $gt: [{ $size: "$transactions" }, 0] },
        },
      },
      {
        $project: {
          budgets: 0,
          transactions: 0,
        },
      },
    ]);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};


// Update a category
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, type, color, icon } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, type, color, icon },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndRemove(categoryId);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

export { createCategory, getCategoriesByUser, updateCategory, deleteCategory };
