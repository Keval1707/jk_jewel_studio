const Product = require("../models/Product");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .select("-createdAt -updatedAt -__v")
      .populate({
        path: "category",
        select: "-createdAt -updatedAt -__v",
      });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select("-createdAt -updatedAt -__v")
      .populate({ path: "category", select: "-createdAt -updatedAt -__v" });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      desc,
      price,
      discount,
      material,
      stock,
      rating,
      reviews,
      category,
    } = req.body;

    // Validate and cast types
    const parsedPrice = parseFloat(price);
    const parsedDiscount = discount || "0";
    const parsedStock = stock === "true" || stock === true;
    const parsedRating = rating ? parseFloat(rating) : 0;
    const parsedReviews = reviews ? parseInt(reviews) : 0;

    const img =
      req.files?.map(
        (file) => `${process.env.BASE_URL}/upload/${file.filename}`
      ) || [];

    const newProduct = new Product({
      id: require("crypto").randomUUID(),
      name,
      sku,
      desc,
      price: parsedPrice,
      discount: parsedDiscount,
      material,
      stock: parsedStock,
      rating: parsedRating,
      reviews: parsedReviews,
      category,
      img,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("error in add new product:", error);
    res.status(400).json({ error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const body = req.body || {};

    // Destructure fields from body
    const {
      name,
      sku,
      desc,
      price,
      discount,
      material,
      stock,
      rating,
      reviews,
      category,
    } = body;

    // Parse existingImages JSON string safely
    let existingImages = [];
    if (body.existingImages) {
      try {
        existingImages = JSON.parse(body.existingImages);
        if (!Array.isArray(existingImages)) {
          return res
            .status(400)
            .json({ error: "existingImages must be an array" });
        }
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Invalid existingImages JSON format" });
      }
    }

    // Map new uploaded files to URLs
    const newImages =
      req.files?.map(
        (file) => `${process.env.BASE_URL}/upload/${file.filename}`
      ) || [];

    // Prepare update object
    const updateData = {
      name,
      sku,
      desc,
      price,
      discount,
      material,
      stock,
      rating,
      reviews,
      category,
    };

    // Combine old + new images only if there are any
    if (existingImages.length || newImages.length) {
      updateData.img = [...existingImages, ...newImages];
    }

    // Update product in DB
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
