// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";
import "../styles/ProductDetail.css";
import { addToCart, toggleLike, getLikes } from "../utils/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const pid = Number(id);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === pid) || products[0];
  const [liked, setLiked] = useState(getLikes().includes(product.id));

  useEffect(() => {
    setLiked(getLikes().includes(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/catalog" className="back-link">
          ← Back to Catalog
        </Link>

        <div className="product-layout">
          {/* Image Section */}
          <div className="product-image-section">
            {product.image ? (
              <img src={product.image} alt={product.name} className="main-image" />
            ) : (
              <div className="placeholder">Product Image</div>
            )}
          </div>

          {/* Info Section */}
          <div className="product-info-section">
            <h1>{product.name}</h1>
            <div className="price-and-stock">
              <span className="price">${product.price}</span>
              <span className="stock">In Stock</span>
            </div>

            <p className="description">{product.description}</p>

            {product.specs && product.specs.length > 0 && (
              <div className="specs-section">
                <h3>Key Features</h3>
                <ul>
                  {product.specs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="actions-section">
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="action-buttons">
                <button className="btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button
                  className={`btn-like ${liked ? "liked" : ""}`}
                  onClick={() => {
                    toggleLike(product.id);
                    setLiked(getLikes().includes(product.id));
                  }}
                  aria-label="Like"
                >
                  {liked ? "♥" : "♡"}
                </button>
              </div>
            </div>

            <div className="shipping-info">
              <p> Free shipping on orders over $50</p>
              <p>↩ 30-day money-back guarantee</p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="similar-section">
            <h2>Similar Items</h2>
            <div className="similar-grid">
              {similar.map((p) => (
                <div key={p.id} className="similar-card">
                  <Link to={`/product/${p.id}`}>
                    <div className="similar-image">
                      {p.image ? (
                        <img src={p.image} alt={p.name} />
                      ) : (
                        <div className="placeholder">Image</div>
                      )}
                    </div>
                    <h3>{p.name}</h3>
                    <p className="similar-price">${p.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}