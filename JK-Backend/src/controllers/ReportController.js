const Product = require("../models/Product");
const Category = require("../models/Category");
const PlaceOrder = require("../models/PlaceOrder");

const getDashboardReport = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const TotalPlaceOrder = await PlaceOrder.countDocuments();

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

    // Get last 5 placed orders (assuming createdAt exists and is indexed)
    const lastFiveOrders = await PlaceOrder.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("user totalAmount createdAt status") // select required fields

    // Sales data: last 6 months by totalAmount
    const now = new Date();
    const past6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        label: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        month: date.getMonth(),
      };
    }).reverse();

    const monthlySales = await PlaceOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        }
      }
    ]);

    const salesMap = {};
    monthlySales.forEach(sale => {
      salesMap[`${sale._id.year}-${sale._id.month - 1}`] = sale.total;
    });

    const salesData = {
      labels: past6Months.map(m => m.label),
      datasets: [
        {
          label: "Sales",
          data: past6Months.map(m => salesMap[`${m.year}-${m.month}`] || 0),
          backgroundColor: "rgba(52, 152, 219, 0.5)",
          borderColor: "rgba(52, 152, 219, 1)",
          borderWidth: 1,
        },
      ],
    };

    res.json({
      totalProducts,
      totalCategories,
      totalStockItems,
      averageRating: Number(averageRating),
      totalReviews,
      topCategories,
      TotalPlaceOrder,
      lastFiveOrders,
      salesData,
    });

  } catch (err) {
    console.error("Error in getDashboardReport:", err);
    res.status(500).json({ error: "Failed to generate dashboard report" });
  }
};

module.exports = {
  getDashboardReport,
};
