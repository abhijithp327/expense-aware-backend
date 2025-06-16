import Expense from '../models/expense.model.js';
import Budget from '../models/budget.model.js';

export const addExpense = async (req, res) => {
  const { categoryId, amount, date } = req.body;
  const userId = req.user.userId;
  const expenseDate = new Date(date);
  const month = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;

  try {
    const expense = new Expense({ userId, categoryId, amount, date: expenseDate });
    await expense.save();

    // Calculate total spent in the category this month
    const startOfMonth = new Date(`${month}-01T00:00:00`);
    const endOfMonth = new Date(`${month}-31T23:59:59`);

    const totalSpent = await Expense.aggregate([
      {
        $match: {
          userId: expense.userId,
          categoryId: expense.categoryId,
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const spent = totalSpent[0]?.total || 0;

    const budget = await Budget.findOne({
      userId,
      categoryId,
      month,
    });

    const limit = budget?.limit || 0;
    const expenseStatus = spent > limit ? 'over' : 'within';

    res.status(200).json({
      status: 200,
      success: true,
      message: `Expense recorded: ${expenseStatus} budget`,
      result: {
        expenseStatus,
        spent,
        limit,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add expense', error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  const { month } = req.query;
  const userId = req.user.userId;

  try {
    const startOfMonth = new Date(`${month}-01T00:00:00`);
    const endOfMonth = new Date(`${month}-31T23:59:59`);

    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).populate('categoryId');

    res.status(200).json({
      status: 200,
      success: true,
      message: "Expenses fetched successfully",
      result: expenses
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
  }
};
