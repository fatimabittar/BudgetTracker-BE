import mongoose from "mongoose";
import Budget from "../models/budget.js";
import Transaction from "../models/transaction.js";

const getTotalBudgetsAndSpentAmount = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentDate = new Date();
    const startOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
    const endOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));

    const budgets = await Budget.find({
      userId,
      startDate: { $gte: startOfMonth },
      endDate: { $lte: endOfMonth },
    });

    const categoryIds = budgets.map(budget => budget.categoryId._id);

    const totalBudgets = budgets.reduce((acc, budget) => acc + budget.amount, 0);

    const spentAmountPipeline = [
      {
        $match: {
          categoryId: { $in: categoryIds },
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSpentAmount: { $sum: "$amount" },
        },
      },
    ];

    const spentAmountResult = await Transaction.aggregate(spentAmountPipeline);

    const totalSpentAmount = spentAmountResult.length > 0 ? spentAmountResult[0].totalSpentAmount : 0;

    const unbudgetedTransactionsPipeline = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          categoryId: { $nin: categoryIds },
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          'category.type': 'expense',
        },
      },
      {
        $group: {
          _id: null,
          totalUnbudgetedAmount: { $sum: "$amount" },
        },
      },
    ];

    const unbudgetedTransactionsResult = await Transaction.aggregate(unbudgetedTransactionsPipeline);

    const totalUnbudgetedAmount = unbudgetedTransactionsResult.length > 0 ? unbudgetedTransactionsResult[0].totalUnbudgetedAmount : 0;

    const result = {
      totalBudgets,
      totalSpentAmount,
      totalUnbudgetedAmount,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch total budgets and spent amount' });
  }
};

const getExpensesPerDay = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = new Date().getDay();

    const rearrangedDays = [...daysOfWeek.slice(currentDay + 1), ...daysOfWeek.slice(0, currentDay + 1)];

    const expensesPerDay = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
          },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          'category.type': 'expense',
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$date' },
          totalExpenses: { $sum: '$amount' },
        },
      },
    ]);
    console.log(expensesPerDay);
    const expensesByDay = rearrangedDays.map((day) => {
      const matchingExpense = expensesPerDay.find((item) => daysOfWeek[item._id - 1] === day);
      return {
        _id: day,
        totalExpenses: matchingExpense ? matchingExpense.totalExpenses : 0,
      };
    });

    res.json(expensesByDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expenses per day' });
  }
};

const getExpenseCategories = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    const startOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
    const endOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const expenseCategories = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          'category.type': 'expense',
        },
      },
      {
        $group: {
          _id: '$categoryId',
          categoryName: { $first: '$category.name' },
          categoryIcon: { $first: '$category.icon' },
          categoryColor: { $first: '$category.color' },
          totalExpenses: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          categoryId: '$_id',
          categoryName: 1,
          categoryIcon: 1,
          categoryColor: 1,
          totalExpenses: 1,
        },
      },
    ]);

    res.json(expenseCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expense categories' });
  }
};


const getCurrentAmountInWallet = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomeTotal = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          'category.type': 'income',
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
        },
      },
    ]);

    const expenseTotal = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          'category.type': 'expense',
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          totalExpenses: 1,
        },
      },
    ]);

    const currentAmountInWallet = (incomeTotal[0]?.totalIncome || 0) - (expenseTotal[0]?.totalExpenses || 0);

    res.json({ currentAmountInWallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch current amount in wallet' });
  }
};


export {
  getTotalBudgetsAndSpentAmount,
  getExpensesPerDay,
  getExpenseCategories,
  getCurrentAmountInWallet,
};
