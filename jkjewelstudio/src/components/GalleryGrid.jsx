import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const GalleryGrid = ({ data, categories }) => {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredData =
    activeCategory === "All"
      ? data
      : data.filter((item) => item.category === activeCategory);

  return (
    <div className="gallery-container">
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div className="gallery-grid" layout>
        {filteredData.map((item, i) => (
          <FadeIn>
            <motion.div
              key={i}
              className="gallery-item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(item)}
            >
              <motion.img
                src={item.img}
                alt={`Jewelry ${i + 1}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <div className="item-overlay">
                <button className="view-btn">View Details</button>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.img} alt="Enlarged view" />
              <div className="lightbox-details">
                <h3>{selected.name}</h3>
                <p>{selected.desc}</p>
                {selected.price && <p>{selected.price} ₹</p>}
                <button
                  to="/contact"
                  onClick={() => (window.location.href = "/contact")}
                  className="inquiry-btn"
                >
                  Make an Inquiry
                </button>
              </div>
              <button className="close-btn" onClick={() => setSelected(null)}>
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
