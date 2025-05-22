const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ProductRouter = require("./ProductRouter");
const CategoryRouter = require("./CategoryRouter");
const OrderRouter = require("./OrderRouter");
const HealthRouter = require("./healthRouter");
const adminAuth = require('../middleware/adminAuth');
const ReportController = require("../controllers/ReportController");
const { sendCustomEmail } = require('../controllers/MailController');


// Root API
router.get("/", (req, res) => {
  res.send("Welcome to the API root!");
});

// Other routers
router.use("/product", ProductRouter);
router.use("/category", CategoryRouter);
router.use("/order", OrderRouter);
router.use("/api", HealthRouter);
router.post('/sendmail',adminAuth, sendCustomEmail);


// Protected report route
router.get("/report", adminAuth, ReportController.getDashboardReport);

// Admin login route
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy check — replace with your real admin auth logic
  if (email === "admin@admin.com" && password === "admin@admin.com") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res
      .cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "Lax",
      })
      .json({ status: true, message: "Logged in" });
  } else {
    res.status(401).json({ status: false, error: "Invalid email or password" });
  }
});

// Admin logout route
router.post("/admin/logout", (req, res) => {
  res
    .clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    })
    .json({ status: true, message: "Logged out successfully" });
});

// Optional: route to get current admin info if token is valid
router.get("/admin/me", adminAuth, (req, res) => {
  // Assuming adminAuth middleware sets req.admin after verifying token
  res.json({ email: req.admin.email });
});

module.exports = router;
