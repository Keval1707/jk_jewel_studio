import React from "react";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero ">
        <div className="hero-overlay">
            <FadeIn>
          <h1>
              Our Story: Where Passion Meets Precision
          </h1>
              </FadeIn>
            <FadeIn>
          <p>
              Every piece tells a story - this is ours
          </p>
              </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <h2 className="section-title">The KJ Jewel Studio Journey</h2>

        <div className="timeline">
          <div className="timeline-item">
            <FadeIn>
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Humble Beginnings</h3>
                <p>
                  A small workshop with big dreams - our founder started with
                  just a bench and a vision to revolutionize jewelry design.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="timeline-item">
            <FadeIn>
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>Embracing Technology</h3>
                <p>
                  We invested in cutting-edge 3D printing technology, merging
                  traditional craftsmanship with digital precision.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="timeline-item">
            <FadeIn>
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>First Major Collaboration</h3>
                <p>
                  Partnered with emerging designers to create exclusive
                  collections that gained industry recognition.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="timeline-item">
            <FadeIn>
              <div className="timeline-year">Present</div>
              <div className="timeline-content">
                <h3>Your Vision, Our Craft</h3>
                <p>
                  Today, we're proud to work with clients worldwide to bring
                  their most precious jewelry visions to life.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-content">
          <h2>Our Philosophy</h2>
          <div className="philosophy-points">
            <div className="philosophy-item">
              <FadeIn>
                <h3>Innovation</h3>
                <p>
                  Pushing boundaries with technology while respecting
                  traditional techniques
                </p>
              </FadeIn>
            </div>
            <div className="philosophy-item">
              <FadeIn>
                <h3>Integrity</h3>
                <p>Ethically sourced materials and transparent pricing</p>
              </FadeIn>
            </div>
            <div className="philosophy-item">
              <FadeIn>
                <h3>Individuality</h3>
                <p>No two pieces alike - each creation tells a unique story</p>
              </FadeIn>
            </div>
          </div>
        </div>
        <div className="philosophy-image">
          <img src="/images/artisan-working.jpg" alt="Artisan at work" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Create Your Story With Us?</h2>
        <p>
          Schedule a consultation with our design team to begin your custom
          jewelry journey
        </p>
        <div className="cta-buttons">
          <Button
            text="Book Consultation"
            variant="secondary"
            onClick={() => (window.location.href = "/contact")}
          />
          <Button
            text="View Our Process →"
            variant="outline"
            onClick={() => (window.location.href = "/gallery")}
          />
        </div>
      </section>
    </div>
  );
};

export default About;
