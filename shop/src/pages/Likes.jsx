import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import { getLikes, toggleLike, addToCart } from "../utils/cart";
import "../styles/Likes.css";

export default function Likes() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    const likes = getLikes();
    setLikedIds(likes);
    const liked = products.filter(p => likes.includes(p.id));
    setLikedProducts(liked);

    // Listen for localStorage updates
    const onUpdate = () => {
      const newLikes = getLikes();
      setLikedIds(newLikes);
      const newLiked = products.filter(p => newLikes.includes(p.id));
      setLikedProducts(newLiked);
    };

    window.addEventListener("storage", onUpdate);
    window.addEventListener("localStorageUpdated", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("localStorageUpdated", onUpdate);
    };
  }, []);

  const handleToggleLike = (id) => {
    toggleLike(id);
    const likes = getLikes();
    setLikedIds(likes);
    const liked = products.filter(p => likes.includes(p.id));
    setLikedProducts(liked);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="likes-page">
      <div className="container">
        <h1>Your Liked Products</h1>
        
        {likedProducts.length === 0 ? (
          <div className="empty-state">
            <p>❤️ You haven't liked any products yet.</p>
            <Link to="/catalog" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="likes-grid">
            {likedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">${product.price}</p>
                  
                  <div className="card-actions">
                    <Link to={`/product/${product.id}`} className="btn-primary">View</Link>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <button 
                    className={`btn-like ${likedIds.includes(product.id) ? 'liked' : ''}`}
                    onClick={() => handleToggleLike(product.id)}
                    style={{width: '100%', marginTop: '8px'}}
                  >
                    {likedIds.includes(product.id) ? '♥ Remove from Likes' : '♡ Add to Likes'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
