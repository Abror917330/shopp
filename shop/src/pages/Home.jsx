// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../data/products";

import elecktorns from "../assets/ickonka💻.jpg";
import fashion from "../assets/иконки 👗.png";
import siport from "../assets/иконки спорт.png";
import aboutimg from "../assets/about-img.svg";
import banner from "../assets/banner.jpg"
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const categoriesToShow = ["Electronics", "Fashion", "Sport"];

  let displaySections = [];

  if (selected) {
    const filtered = products
      .filter((p) => p.category === selected)
      .slice(0, 8);
    displaySections = [{ name: selected, items: filtered }];
  } else {
    displaySections = categoriesToShow.map((cat) => ({
      name: cat,
      items: products.filter((p) => p.category === cat).slice(0, 8),
    }));
  }

  const handleCategoryClick = (cat) => {
    setSelected(selected === cat ? "" : cat);
  };

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero">
        <img src={banner} alt="Promo" className="hero-bg" />
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Amazing Deals</h1>
          <p className="hero-subtitle">
            Premium products. Unbeatable prices. Fast delivery.
          </p>
          <Link to="/catalog" className="btn btn-hero">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2 className="section-heading">Categories</h2>
        <div className="categories-grid">
          {[
            { key: "Electronics", label: "Electronics", icon: elecktorns },
            { key: "Fashion", label: "Fashion", icon: fashion },
            { key: "Sport", label: "Sport", icon: siport },
          ].map((cat) => (
            <button
              key={cat.key}
              className={`category-card${selected === cat.key ? " selected" : ""}`}
              onClick={() => handleCategoryClick(cat.key)}
            >
              <img
                src={cat.icon}
                alt={`${cat.label} icon`}
                className="category-icon"
              />
              <h3>{cat.label}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* Product Sections */}
      {displaySections.map((section) => (
        <section className="products-section" key={section.name}>
          <div className="section-header">
            <h2 className="section-title">{section.name}</h2>
            {selected === section.name && (
              <button
                className="btn-clear-filter"
                onClick={() => setSelected("")}
              >
                ✕ Clear Filter
              </button>
            )}
          </div>
          <div className="products-grid">
            {section.items.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="placeholder">Image</div>
                    )}
                  </div>
                </Link>
                <h3>
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="category-tag">{product.category}</p>
                <div className="product-footer">
                  <span className="price">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* About Section */}
      <section className="about-block">
        <div className="about-wrapper">
          <div className="about-text">
            <h2 className="about-title">About ShopHub</h2>
            <p className="about-desc">
              ShopHub is your trusted online destination for high-quality electronics, fashion, and sport essentials.  
              We prioritize fast shipping, secure checkout, and 24/7 customer care — because your satisfaction is our mission.
            </p>
            <Link to="/about" className="btn btn-about">
              Learn More
            </Link>
          </div>
          <div className="about-image-container">
            <img
              src={aboutimg}
              alt="About ShopHub"
              className="about-image"
            />
            <div className="about-badge">
              <span>✓ Trusted by 50K+ customers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}