import "../styles/About.css";
import { FaUsers, FaBox, FaGlobeAmericas, FaStar, FaGem, FaHandshake, FaBolt } from "react-icons/fa";
import { FiUser, FiCode, FiSettings, FiHeadphones } from "react-icons/fi";

export default function About() {
  const teamMembers = [
    { id: 1, name: "Sarah Johnson", role: "CEO & Founder", icon: <FiUser /> },
    { id: 2, name: "Ahmed Hassan", role: "CTO", icon: <FiCode /> },
    { id: 3, name: "Maria Garcia", role: "Head of Operations", icon: <FiSettings /> },
    { id: 4, name: "David Lee", role: "Customer Success Lead", icon: <FiHeadphones /> },
  ];

  const testimonials = [
    { id: 1, name: "Alex Thompson", quote: "ShopHub has changed the way I shop online. Great prices and fast delivery!", rating: 5 },
    { id: 2, name: "Emily Rodriguez", quote: "Customer service is outstanding. They helped me with my order issues immediately.", rating: 5 },
    { id: 3, name: "James Wilson", quote: "I love the variety of products available. Highly recommended!", rating: 4 },
  ];

  const stats = [
    { label: "Customers", value: "50K+", icon: <FaUsers /> },
    { label: "Products", value: "10K+", icon: <FaBox /> },
    { label: "Countries", value: "25+", icon: <FaGlobeAmericas /> },
    { label: "Satisfaction", value: "98%", icon: <FaStar /> },
  ];

  const values = [
    { icon: <FaGem />, title: "Quality", desc: "We only stock products that meet our high standards" },
    { icon: <FaHandshake />, title: "Trust", desc: "Transparency and honesty in every transaction" },
    { icon: <FaBolt />, title: "Speed", desc: "Quick processing and fast delivery times" },
    { icon: <FaStar />, title: "Excellence", desc: "We strive to exceed expectations in all we do" },
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <h1>About ShopHub</h1>
        <p>Your trusted online shopping destination</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, ShopHub has been committed to providing customers
            with high-quality products at affordable prices. We believe in making
            online shopping easy, accessible, and enjoyable for everyone.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To revolutionize the online shopping experience by offering a curated
            selection of products from trusted brands, exceptional customer
            service, and fast, reliable delivery.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="features-list">
            <li><span className="check-icon">✓</span> Wide variety of products</li>
            <li><span className="check-icon">✓</span> Competitive prices</li>
            <li><span className="check-icon">✓</span> Fast and free shipping</li>
            <li><span className="check-icon">✓</span> 30-day money-back guarantee</li>
            <li><span className="check-icon">✓</span> 24/7 customer support</li>
            <li><span className="check-icon">✓</span> Secure payment options</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section stats-section">
          <h2>By The Numbers</h2>
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-avatar">{member.icon}</div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section testimonials-section">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.quote}"</p>
                <p className="testimonial-author">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section cta-section">
          <h2>Ready to Start Shopping?</h2>
          <p>Join thousands of satisfied customers and explore our amazing collection.</p>
          <a href="/catalog" className="btn-primary">Browse Products</a>
        </div>
      </section>
    </div>
  );
}