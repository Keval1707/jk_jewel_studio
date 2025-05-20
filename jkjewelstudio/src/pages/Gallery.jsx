import React from "react";
import GalleryGrid from "../components/GalleryGrid";

const data = [
  {
    id: 101,
    name: "Diamond Ring",
    desc: "Elegant 14k white gold diamond ring",
    // price: "2500",
    img: "/images/gallery/11.png",
    category: "Rings",
  },
  {
    id: 102,
    name: "Gold Necklace",
    desc: "24k gold necklace with floral pendant",
    // price: "1800",
    img: "/images/gallery/12.png",
    category: "Necklaces",
  },
  {
    id: 103,
    name: "Sapphire Earrings",
    desc: "Blue sapphire studs in sterling silver",
    // price: "750",
    img: "/images/gallery/13.png",
    category: "Earrings",
  },
  {
    id: 1041,
    name: "Pearl Bracelet",
    desc: "Classic pearl bracelet with gold clasp",
    // price: "500",
    img: "/images/gallery/4.png",
    category: "Bracelets",
  },
  {
    id: 104,
    name: "Ruby Pendant",
    desc: "Ruby heart pendant on a silver chain",
    // price: "950",
    img: "/images/gallery/14.png",
    category: "Necklaces",
  },
  {
    id: 105,
    name: "Ruby Pendant",
    desc: "Ruby heart pendant on a silver chain",
    // price: "950",
    img: "/images/gallery/5.png",
    category: "Necklaces",
  },
  {
    id: 106,
    name: "Emerald Anklet",
    desc: "Delicate anklet with emerald accents",
    // price: "400",
    img: "/images/gallery/16.png",
    category: "Bracelets", // Anklet is best grouped with bracelets
  },
];

const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

const Gallery = () => {
  return (
    <section className="gallery-page">
      <h1>Gallery</h1>
      <GalleryGrid data={data} categories={categories} />
    </section>
  );
};

export default Gallery;
