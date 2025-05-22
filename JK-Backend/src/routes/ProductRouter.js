const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const upload = require("../middleware/upload");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth, upload.array("img", 5), ProductController.addNewProduct);
router.put("/:id", adminAuth, upload.array("img", 5), ProductController.updateProduct);
router.delete("/:id", adminAuth, ProductController.deleteProduct);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

module.exports = router;
