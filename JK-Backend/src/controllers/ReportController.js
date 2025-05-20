const Product = require("../models/Product");
const Category = require("../models/Category");

const getDashboardReport = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();

    const products = await Product.find({}, "stock rating reviews category");

    const totalStockItems = products.filter(p => p.stock).length;

    const totalReviews = products.reduce((acc, p) => acc + (p.reviews || 0), 0);

    const averageRating =
      products.length > 0
        ? (products.reduce((acc, p) => acc + (p.rating || 0), 0) / products.length).toFixed(2)
        : 0;

    // Compute top categories by product count
    const categoryCounts = {};

    products.forEach((product) => {
      const categoryId = product.category?.toString();
      if (categoryId) {
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
      }
    });

    const categoryIds = Object.keys(categoryCounts);
    const categories = await Category.find({ _id: { $in: categoryIds } });

    const topCategories = categories
      .map((cat) => ({
        name: cat.name,
        count: categoryCounts[cat._id.toString()] || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5 categories

    res.json({
      totalProducts,
      totalCategories,
      totalStockItems,
      averageRating: Number(averageRating),
      totalReviews,
      topCategories,
    });

  } catch (err) {
    console.error("Error in getDashboardReport:", err);
    res.status(500).json({ error: "Failed to generate dashboard report" });
  }
};

module.exports = {
  getDashboardReport,
};
