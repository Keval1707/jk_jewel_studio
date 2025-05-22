const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const adminAuth = require("../middleware/adminAuth");

router.post("/place", OrderController.placeOrder);

router.get("/", adminAuth, OrderController.getAllOrders);
router.get("/:id", adminAuth, OrderController.getOrderById);
router.put("/status/:id", adminAuth, OrderController.updatestauts);

module.exports = router;
