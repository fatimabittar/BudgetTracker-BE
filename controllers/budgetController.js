import Budget from "../models/budget.js";

// Create a new budget
const createBudget = async (req, res) => {
  try {
    const { categoryId, amount, startDate, endDate, userId } = req.body;
    const newBudget = new Budget({
      categoryId,
      amount,
      startDate,
      endDate,
      userId,
    });

    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    const savedBudget = await newBudget.save();
    res.json(savedBudget);
  } catch (error) {
    res.status(500).json({ error: "Failed to create budget" });
  }
};

// Get all budgets for a user
const getBudgetsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};

// Update a budget
const updateBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const { categoryId, amount, startDate, endDate } = req.body;
    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      { categoryId, amount, startDate, endDate },
      { new: true }
    );
    res.json(updatedBudget);
  } catch (error) {
    res.status(500).json({ error: "Failed to update budget" });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    await Budget.findByIdAndRemove(budgetId);
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete budget" });
  }
};

export { createBudget, getBudgetsByUser, updateBudget, deleteBudget };
