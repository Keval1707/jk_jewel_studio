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

  // Sample sales data (not from backend)
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 1500, 2000, 1800, 2200],
        backgroundColor: "rgba(52, 152, 219, 0.5)",
        borderColor: "rgba(52, 152, 219, 1)",
        borderWidth: 1,
      },
    ],
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

  // Sample recent activity data (not from backend)
  const recentActivity = [
    {
      id: 1,
      action: "New product added",
      details: "Product 'Wireless Headphones' was added",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Order completed",
      details: "Order #12345 was completed",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "User registered",
      details: "New user 'john.doe@example.com' registered",
      time: "1 day ago",
    },
    {
      id: 4,
      action: "Category updated",
      details: "Category 'Electronics' was updated",
      time: "2 days ago",
    },
  ];

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
        <div className="admin-dashboard-card">
          <h2>In Stock Items</h2>
          <p>{report.totalStockItems}</p>
        </div>
        <div className="admin-dashboard-card">
          <h2>Average Rating</h2>
          <p>{report.averageRating.toFixed(1)}</p>
        </div>
        <div className="admin-dashboard-card">
          <h2>Total Reviews</h2>
          <p>{report.totalReviews}</p>
        </div>
      </div>

      <div className="admin-dashboard-graphs">
        <div className="admin-graph-container">
          <div className="admin-graph-header">
            <h3 className="admin-graph-title">
              Sales Overview{" "}
              <small style={{ fontWeight: "normal", color: "#888" }}>
                (Sample data - not from backend)
              </small>
            </h3>
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
                  legend: {
                    display: false,
                  },
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
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="admin-dashboard-graphs">
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
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="admin-graph-container">
          <div className="admin-graph-header">
            <h3 className="admin-graph-title">
              Recent Orders{" "}
              <small style={{ fontWeight: "normal", color: "#888" }}>
                (Data visualization placeholder)
              </small>
            </h3>
          </div>
          <div className="admin-graph-placeholder">
            Orders data visualization
          </div>
        </div>
      </div>

      <div className="admin-recent-activity">
        <h3 className="admin-activity-header">
          Recent Activity{" "}
          <small style={{ fontWeight: "normal", color: "#888" }}>
            (Sample data - not from backend)
          </small>
        </h3>
        <ul className="admin-activity-list">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="admin-activity-item">
              <div className="admin-activity-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="admin-activity-text">
                <strong>{activity.action}</strong>
                <div>{activity.details}</div>
              </div>
              <div className="admin-activity-time">{activity.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
