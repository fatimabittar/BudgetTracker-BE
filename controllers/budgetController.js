import Budget from "../models/budget.js";
import Transaction from "../models/transaction.js";

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
    const { day, month, year, range = 0 } = req.query;
    let query = { userId };

    if (day && month && year) {
      query.startDate = { $gte: new Date(Date.UTC(year, month - 1, day)) };
      query.endDate = { $lt: new Date(Date.UTC(year, Number(month) + Number(range), day)) };
    }

    const budgets = await Budget.find(query).populate('categoryId').exec();

    const items = await Promise.all(budgets.map(async (item) => {
      const formattedStartDate = new Date(item.startDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const formattedEndDate = new Date(item.endDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const spentAmount = await Transaction.aggregate([
        {
          $match: {
            categoryId: item.categoryId._id,
            date: {
              $gte: item.startDate,
              $lt: item.endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: '$amount' },
          },
        },
      ]);
      const budgetWithSpentAmount = {
        id: item._id,
        startDate: item.startDate.toISOString(),
        endDate: item.endDate.toISOString(),
        formattedStartDate: formattedStartDate,
        formattedEndDate: formattedEndDate,
        categoryId: item.categoryId._id,
        categoryName: item.categoryId.name,
        type: item.categoryId.type,
        amount: item.amount,
        icon: item.categoryId.icon,
        color: item.categoryId.color,
        spentAmount: spentAmount.length > 0 ? spentAmount[0].totalSpent : 0,
      };

      return budgetWithSpentAmount;
    }));

    res.json(items);
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
