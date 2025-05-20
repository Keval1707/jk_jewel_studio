const express = require("express");
const router = express.Router();

const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./CategoryRouter')

const ReportController = require('../controllers/ReportController')

router.get("/", (req, res) => {
  res.send("Welcome to the API root!");
});

router.use('/product' ,ProductRouter);
router.use('/category' ,CategoryRouter);
router.get("/report", ReportController.getDashboardReport);


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@admin.com") {  // fixed typo in email
    if (password === "admin@admin.com") {  // fixed typo in password
      return res.status(200).json({ status: true, message: "User logged in" });
    }
    return res.status(401).json({ error: "Password does not match" });
  }
  return res.status(401).json({ error: "Email and password do not match" });
});


module.exports = router;
