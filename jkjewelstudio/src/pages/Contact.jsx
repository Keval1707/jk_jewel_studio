import React, { useState } from "react";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import { useToast } from "../features/ToastContext";
import { contact } from "../utils/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setSubmitSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
      await contact(form);
      showToast("Message sent successfully!", "success");
    } catch (error) {
      showToast("Submission error !", "error");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="hero-content">
          <h1>
            <FadeIn>Get in Touch</FadeIn>
          </h1>
          
          <p>
            {" "}
            <FadeIn>
              We'd love to hear from you about your custom jewelry needs{" "}
            </FadeIn>
          </p>
        </div>
      </section>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-card">
            <FadeIn>
              <div className="info-item">
                <i className="icon">
                  📞 <h3>Phone</h3>
                </i>
                <div>
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="info-item">
                <i className="icon">
                  ✉️ <h3>Email</h3>
                </i>
                <div>
                  <p>info@jkjewelstudio.com</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="info-item">
                <i className="icon">
                  📍 <h3>Address</h3>
                </i>
                <div>
                  <p>
                    {/* Nikol
                  <br /> */}
                    Ahmedabad , Gujarat - 382350
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="contact-form">
          <FadeIn>
            <h2>Send Us a Message</h2>
          </FadeIn>
          {submitSuccess ? (
            <div className="success-message">
              <h3>Thank You!</h3>
              <p>
                Your message has been sent successfully. Our team will get back
                to you within 24 hours.
              </p>
              <Button
                text="Send Another Message"
                onClick={() => {
                  setSubmitSuccess(false);
                  showToast("You can send another message now.", "info");
                }}
                variant="outline"
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <FadeIn>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </FadeIn>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <FadeIn>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </FadeIn>
                </div>
                <div className="form-group">
                  <FadeIn>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </FadeIn>
                </div>
              </div>

              <div className="form-group">
                <FadeIn>
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Custom Design">Custom Design Request</option>
                    <option value="Repair Service">Jewelry Repair</option>
                    <option value="Wholesale">Wholesale Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </FadeIn>
              </div>

              <div className="form-group">
                <FadeIn>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </FadeIn>
              </div>

              <Button
                type="submit"
                text={isSubmitting ? "Sending..." : "Send Message"}
                variant="primary"
                disabled={isSubmitting}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
