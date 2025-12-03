// src/pages/Contact.jsx
import { useState } from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent! We’ll contact you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact">
      {/* Hero */}
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We’re here to help — reach out with any questions or feedback!</p>
      </section>

      {/* Info + Form */}
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <h3>Our Address</h3>
            <p>123 Shopping Street</p>
            <p>Commerce City, CC 12345</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaPhoneAlt /></div>
            <h3>Phone & Support</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon–Fri: 9AM–6PM EST</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaEnvelope /></div>
            <h3>Email Us</h3>
            <p>support@shophub.com</p>
            <p>sales@shophub.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaClock /></div>
            <h3>Business Hours</h3>
            <p>Monday–Friday: 9AM–6PM</p>
            <p>Saturday: 10AM–4PM</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="How can we help you?"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn-submit">
            📬 Send Message
          </button>
        </form>
      </div>

      {/* Social Links */}
      <section className="contact-social">
        <h2>Follow Us</h2>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
        <p className="social-desc">Stay updated with our latest products and offers!</p>
      </section>

      {/* FAQ Preview */}
      <section className="contact-faq">
        <h2>Frequently Asked</h2>
        <div className="faq-preview">
          <div className="faq-item">
            <strong>How long does shipping take?</strong>
            <p>Most orders arrive within 3–5 business days.</p>
          </div>
          <div className="faq-item">
            <strong>Can I return an item?</strong>
            <p>Yes! Returns are accepted within 30 days of delivery.</p>
          </div>
          <div className="faq-item">
            <strong>Do you ship internationally?</strong>
            <p>We currently ship to the US, Canada, and EU countries.</p>
          </div>
        </div>
        <Link to="/faq" className="btn-ghost">View All FAQs →</Link>
      </section>
    </div>
  );
}