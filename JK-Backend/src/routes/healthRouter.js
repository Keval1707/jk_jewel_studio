// In routes/healthRouter.js
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API server is running",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
