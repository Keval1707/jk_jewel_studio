const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth, CategoryController.createCategory);
router.put("/:id", adminAuth, CategoryController.updateCategory);
router.delete("/:id", adminAuth, CategoryController.deleteCategory);

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

module.exports = router;
