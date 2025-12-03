// src/pages/Catalog.jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";
import "../styles/Catalog.css";
import { addToCart, toggleLike, getLikes } from "../utils/cart";

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    setLikedIds(getLikes());
  }, []);

  const filtered = q
    ? products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.tags?.join(" ").toLowerCase().includes(q.toLowerCase())
      )
    : products;

  const displayed = (() => {
    if (q) return filtered;
    const copy = filtered.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  })();

  return (
    <div className="catalog-page">
      <div className="page-header">
        <h1>Catalog</h1>
        {q && <p className="search-info">Results for: "{q}"</p>}
      </div>

      {displayed.length === 0 ? (
        <div className="no-results">
          <p>No products found. Try another search.</p>
        </div>
      ) : (
        <div className="products-grid">
          {displayed.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-link">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="placeholder">Image</div>
                  )}
                </div>
              </Link>
              <div className="product-info">
                <h3>
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="category">{product.category}</p>
                <div className="product-actions">
                  <span className="price">${product.price}</span>
                  <div className="buttons">
                    <button
                      className="btn-add"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, 1);
                        alert("Added to cart!");
                      }}
                    >
                      Add
                    </button>
                    <button
                      className={`btn-like ${likedIds.includes(product.id) ? "liked" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(product.id);
                        setLikedIds(getLikes());
                      }}
                      aria-label="Like"
                    >
                      {likedIds.includes(product.id) ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}