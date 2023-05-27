import Transaction from "../models/transaction.js";

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { categoryId, amount, description, date, userId } = req.body;
    const newTransaction = new Transaction({
      categoryId,
      amount,
      description,
      date,
      userId,
    });


    const savedTransaction = await newTransaction.save();
    console.log(savedTransaction);
    res.json(savedTransaction);

  } catch (error) {
    console.error('Failed to create transaction', error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

// Get all transactions for a user
const getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).populate('categoryId').exec()
    const items = transactions.map((item) => {
      const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      return {
        id: item._id,
        date: formattedDate,
        categoryId: item.categoryId._id,
        categoryName: item.categoryId.name,
        type: item.categoryId.type,
        description: item.description,
        amount: item.amount,
        icon: item.categoryId.icon,
        color: item.categoryId.color,
      }
    })
    res.json(items);
  } catch (error) {
    res.status(500).json(error);
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
