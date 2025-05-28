import React, { useEffect, useState } from "react";
import ProductsGrid from "../components/ProductsGrid";
import { fetchProducts, fetchCategories } from "../utils/api";

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
        const catRes = await fetchCategories();
        console.log("Categories response:", catRes);
        const categoryNames = Array.isArray(catRes.data)
          ? catRes.data.map((cat) => cat.name)
          : [];
        setCategories(categoryNames);

        const prodRes = await fetchProducts();
        console.log("Products response:", prodRes);
        const products = Array.isArray(prodRes.data)
          ? prodRes.data.map((p) => ({
              id: p._id,
              name: p.name,
              desc: p.desc || "",
              price: p.price,
              discount: p.discount ? p.discount + "%" : "",
              img:
                p.img && p.img.length > 0
                  ? p.img[0]
                  : "/images/placeholder.png",
              category: p.category?.name || "Uncategorized",
              sku: p.sku,
              stock: p.stock,
              material: p.material,
              rating: p.rating,
              reviews: p.reviews,
            }))
          : [];

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

  if (loading) return <div>Loading jewellery...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <section className="gallery-page">
      <h1>Jewellery</h1>
      <ProductsGrid data={data} categories={categories} />
    </section>
  );
};

export default Jewellery;
