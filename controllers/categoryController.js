import Category from "../models/category.js";


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

    const categories = await Category.find({ userId, type });
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
