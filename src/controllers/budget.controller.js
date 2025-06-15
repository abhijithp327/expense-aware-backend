import Budget from "../models/budget.model.js";


export const getBudgets = async (req, res) => {
  const { month } = req.query;
  try {
    const budgets = await Budget.find({ userId: req.user.userId, month }).populate('categoryId');
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch budgets', error: err.message });
  }
};

export const createBudget = async (req, res) => {
  const { categoryId, month, limit } = req.body;
  try {
    const newBudget = new Budget({ userId: req.user.userId, categoryId, month, limit });
    await newBudget.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "Budget created successfully",
      result: newBudget
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create budget', error: err.message });
  }
};

export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { limit } = req.body;
  try {
    const updated = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { limit },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Budget not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update budget', error: err.message });
  }
};

export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Budget.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!deleted) return res.status(404).json({ message: 'Budget not found' });

    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete budget', error: err.message });
  }
};
