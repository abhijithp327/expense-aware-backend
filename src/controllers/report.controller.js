import Expense from '../models/expense.model.js';
import Category from '../models/category.model.js';
import Budget from '../models/budget.model.js';
import mongoose from 'mongoose';

export const getMonthlyReport = async (req, res) => {
  const { month } = req.query;
  const userId = req.user.userId;
  console.log(userId);

  const start = new Date(`${month}-01T00:00:00`);
  const end = new Date(`${month}-31T23:59:59`);

  try {
    // Get all user's categories
    const categories = await Category.find({ userId });

    // Get all expenses this month
    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: '$categoryId',
          totalSpent: { $sum: '$amount' },
        },
      },
    ]);

    // Map: categoryId -> spent
    const spentMap = {};
    expenses.forEach((e) => {
      spentMap[e._id.toString()] = e.totalSpent;
    });

    // Get budgets for this month
    const budgets = await Budget.find({ userId, month });

    // Map: categoryId -> limit
    const budgetMap = {};
    budgets.forEach((b) => {
      budgetMap[b.categoryId.toString()] = b.limit;
    });

    // Combine everything into report
    const report = categories.map((cat) => {
      const catId = cat._id.toString();
      const spent = spentMap[catId] || 0;
      const limit = budgetMap[catId] || 0;
      const remaining = limit - spent;
      const isOverspent = remaining < 0;

      return {
        categoryId: cat._id,
        name: cat.name,
        color: cat.color,
        spent,
        limit,
        remaining,
        isOverspent,
      };
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate report', error: err.message });
  }
};
