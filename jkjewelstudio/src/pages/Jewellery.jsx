import React, { useEffect, useState } from "react";
import ProductsGrid from "../components/ProductsGrid";
import { fetchProducts, fetchCategories } from "../utils/api";
import LoadingScreen from "../components/LoadingScreen";

const Jewellery = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch categories
        const catRes = await fetchCategories();
        // Extract category names from response
        const categoryNames = catRes.data.map((cat) => cat.name);
        setCategories(categoryNames);

        // Fetch products
        const prodRes = await fetchProducts();

        // Map product data to expected format
        const products = prodRes.data.map((p) => ({
          id: p._id,
          name: p.name,
          desc: p.desc || "",
          price: p.price,
          discount: p.discount ? p.discount + "%" : "", // Add % if discount exists
          img: p.img && p.img.length > 0 ? p.img[0] : "/images/placeholder.png", // Use first image URL or placeholder
          category: p.category?.name || "Uncategorized",
          sku: p.sku,
          stock: p.stock,
          material: p.material,
          rating: p.rating,
          reviews: p.reviews,
        }));

        setData(products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products or categories.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingScreen/>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <section className="gallery-page">
      <h1>Jewellery</h1>
      <ProductsGrid data={data} categories={categories} />
    </section>
  );
};

export default Jewellery;
