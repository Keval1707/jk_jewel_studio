// src/pages/Home.jsx
import React from "react";
import ServiceCard from "../components/ServiceCard";
import Button from "../components/Button";
import Fadein from "../components/FadeIn";

const Home = () => {
  const services = [
    {
      title: "Engagement Rings",
      description:
        "Exquisite designs crafted with precision and care. Our engagement rings symbolize eternal love with the finest materials and timeless elegance.",
      icon: "💍",
    },
    {
      title: "Custom Jewelry",
      description:
        "Create unique pieces that reflect your personal style. From concept to creation, we bring your vision to life with expert craftsmanship.",
      icon: "✨",
    },
    {
      title: "Jewelry Manufacturing",
      description:
        "High-quality manufacturing services for businesses and collectors. Precision engineering meets artistic design in every piece.",
      icon: "🔨",
    },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
            <Fadein>
          <h1 className="hero-title">
              Beautiful, masterful design never goes out of fashion.
          </h1>
            </Fadein>
            <Fadein>
          <p className="hero-subtitle">
              Timeless jewelry crafted with passion and precision
          </p>
              </Fadein>
          <div className="button-group">
            <Button
              text="Explore Collection"
              onClick={() => (window.location.href = "/gallery")}
              variant="primary"
            />
            <Button
              text="Book Consultation →"
              onClick={() => (window.location.href = "/contact")}
              variant="outline"
            />
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero.png" alt="Elegant jewelry display" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Exceptional craftsmanship for every occasion
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">No limits to the lifestyle you deserve.</h2>
          <p className="cta-text">
            Begin your jewelry journey with a custom consultation. Share your
            vision and we'll bring it to life.
          </p>
          <Button
            text="Start Your Design →"
            onClick={() => (window.location.href = "/contact")}
            variant="primary"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
            <Fadein>
          <h2 className="section-title">
              About Jkjewelstudio
          </h2>
              </Fadein>

            <Fadein>
          <p className="about-text">
              At KJ jewel studio, we work with high-end designers (both new and
              established), retail stores, and also private clients looking for
              that perfect custom piece or engagement ring.
          </p>
            </Fadein>
            <Fadein>
          <p className="about-text">
              Our studio combines over 2 years of experience with a modern focus
              on 3d printing technology. While we specialize in custom design
              and digital modeling, we're also a respected high-end jewelry
              manufacturer.
          </p>
            </Fadein>
            <Fadein>
          <p className="about-text">
              Our expert team of jewelers and designers will take your custom
              design idea all the way from concept to reality.{" "}
          </p>
            </Fadein>
          <Button
            text="Our Story →"
            onClick={() => (window.location.href = "/about")}
            variant="outline"
          />
        </div>
        <div className="about-image">
          <img
            src="/images/young-blonde-woman-pearl-necklace-white-v-neck-top-smiles-widely-with-closed-eyes-takes-selfie-outside 1.png"
            alt="Jewelry craftsmanship"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
