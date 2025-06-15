import Category from '../models/category.model.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.userId });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Fetch All categories",
      result: categories
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, color } = req.body;

  try {
    const newCategory = new Category({ name, color, userId: req.user.userId });
    await newCategory.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "Category created successfully",
      result: newCategory
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create category', error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;

  try {
    const updated = await Category.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { name, color },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Category not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category', error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Category.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
};
