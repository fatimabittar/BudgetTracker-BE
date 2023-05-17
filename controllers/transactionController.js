import Transaction from "../models/transaction.js";

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { categoryId, amount, description, date, userId, type } = req.body;
    const newTransaction = new Transaction({
      categoryId,
      amount,
      description,
      date,
      type,
      userId,
    });
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

// Get all transactions for a user
const getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { category, amount, description, date } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { category, amount, description, date },
      { new: true }
    );
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    await Transaction.findByIdAndRemove(transactionId);
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

export {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
};
