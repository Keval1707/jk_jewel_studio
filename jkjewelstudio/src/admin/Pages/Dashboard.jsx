import React, { useEffect, useState } from "react";
import { fetchReport } from "../utils/api";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
  const [report, setReport] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStockItems: 0,
    averageRating: 0,
    totalReviews: 0,
    topCategories: [],
    lastFiveOrders: [],
    salesData: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timePeriod, setTimePeriod] = useState("week");

  useEffect(() => {
    const loadReport = async () => {
      try {
        const response = await fetchReport();
        setReport(response.data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;
  if (error) return <div className="admin-empty-state">{error}</div>;

  // Use salesData from backend or fallback to empty data
  const salesData = report.salesData || {
    labels: [],
    datasets: [],
  };

  // Category data from backend
  const categoryData = {
    labels: report?.topCategories?.map((cat) => cat.name) || [],
    datasets: [
      {
        data: report?.topCategories?.map((cat) => cat.count) || [],
        backgroundColor: [
          "rgba(52, 152, 219, 0.7)",
          "rgba(46, 204, 113, 0.7)",
          "rgba(155, 89, 182, 0.7)",
          "rgba(241, 196, 15, 0.7)",
          "rgba(231, 76, 60, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const stockData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [
          report.totalStockItems,
          report.totalProducts - report.totalStockItems,
        ],
        backgroundColor: ["rgba(46, 204, 113, 0.7)", "rgba(231, 76, 60, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  // Format date helper
  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <p className="admin-dashboard-subtitle">
          Overview of your store performance
        </p>
      </div>

      <div className="admin-dashboard-cards">
        <div className="admin-dashboard-card">
          <h2>Total Products</h2>
          <p>{report.totalProducts}</p>
        </div>
        <div className="admin-dashboard-card">
          <h2>Total Categories</h2>
          <p>{report.totalCategories}</p>
        </div>
        {/* <div className="admin-dashboard-card">
          <h2>In Stock Items</h2>
          <p>{report.totalStockItems}</p>
        </div> */}
        <div className="admin-dashboard-card">
          <h2>Average Rating</h2>
          <p>{report.averageRating.toFixed(1)}</p>
        </div>
        <div className="admin-dashboard-card">
          <h2>Total Reviews</h2>
          <p>{report.totalReviews}</p>
        </div>
        <div className="admin-dashboard-card">
          <h2>Total Orders</h2>
          <p>{report.TotalPlaceOrder}</p>
        </div>
      </div>

      <div className="admin-dashboard-graphs">
        <div className="admin-graph-container">
          <div className="admin-graph-header">
            <h3 className="admin-graph-title">Sales Overview</h3>
            <select
              className="admin-graph-period-selector"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div style={{ height: "300px" }}>
            <Line
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        <div className="admin-graph-container">
          <div className="admin-graph-header">
            <h3 className="admin-graph-title">Top Categories</h3>
          </div>
          <div style={{ height: "300px" }}>
            <Pie
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "right" } },
              }}
            />
          </div>
        </div>
      </div>

      <div className="admin-dashboard-graphs" style={{ marginTop: "2rem" }}>
        <div className="admin-graph-container">
          <div className="admin-graph-header">
            <h3 className="admin-graph-title">Stock Status</h3>
          </div>
          <div style={{ height: "300px" }}>
            <Bar
              data={stockData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>

        <div className="admin-graph-container" style={{ marginTop: "2rem" }}>
          <div className="admin-graph-header">
            <h3 className="admin-graph-title">Last 5 Orders</h3>
          </div>
          <div>
            {report.lastFiveOrders.length === 0 && <p>No recent orders found.</p>}
            <ul style={{ listStyle: "none", padding: 0 }}>
              {report.lastFiveOrders.map((order) => (
                <li
                  key={order._id}
                  style={{
                    marginBottom: "1rem",
                    border: "1px solid #ddd",
                    padding: "1rem",
                    borderRadius: "6px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <div>
                    <strong>Order ID:</strong> {order._id}
                  </div>
                  <div>
                    <strong>User:</strong>{" "}
                    {order.user?.name || order.user?.email || "N/A"}
                  </div>
                  <div>
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </div>
                  <div>
                    <strong>Status:</strong> {order.status}
                  </div>
                  <div>
                    <strong>Ordered On:</strong> {formatDate(order.createdAt)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
