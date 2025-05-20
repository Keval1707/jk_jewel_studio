const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const upload = require("../middleware/upload");

// Support single or multiple file uploads as needed
router.post("/", upload.array("img", 5), ProductController.addNewProduct);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", upload.array("img", 5), ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
