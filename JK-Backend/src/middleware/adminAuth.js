const jwt = require("jsonwebtoken");

// Example adminAuth middleware
const adminAuth = (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // e.g., { email: "admin@admin.com", iat: ..., exp: ... }
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = adminAuth;

