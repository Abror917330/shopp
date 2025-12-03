import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import img from '../assets/shophub.png';
import "../styles/Header.css";
import { getCartCount, getLikes } from "../utils/cart";

// Haqiqiy ikonkalar
import { FiMenu, FiSearch, FiHeart, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e && e.preventDefault();
    const q = query.trim();
    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
    } catch (e) {
      setUser(null);
    }
    setCartCount(getCartCount());
    setLikesCount(getLikes().length);

    const onStorage = () => {
      setCartCount(getCartCount());
      setLikesCount(getLikes().length);
      try { setUser(JSON.parse(localStorage.getItem("user"))); } catch (e) {}
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("localStorageUpdated", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("localStorageUpdated", onStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={img} alt="ShopHub" className="logo-img" />
            <span className="logo-text">ShopHub</span>
          </Link>

          {/* Search */}
          <form className="search-form" onSubmit={submitSearch} role="search">
            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            <button type="submit" className="btn-search" aria-label="Search">
              <FiSearch />
            </button>
          </form>

          {/* Mobile menu toggle */}
          <button
            className="menu-toggle"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Catalog</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user && (
              <Link to="/likes" onClick={() => setIsMenuOpen(false)} className="nav-likes">
                <FiHeart /> Likes
              </Link>
            )}
            {!user && (
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            )}
          </nav>

          {/* Actions (Cart, Likes, Profile) */}
          <div className="header-actions">
            <div className="actions-wrapper">
              {!user && (
                <Link to="/likes" className="likes" title="View liked products">
                  <FiHeart /> {likesCount}
                </Link>
              )}
              <Link to="/cart" className="cart-icon" title="View cart">
                <FiShoppingCart /> {cartCount}
              </Link>

              {user && (
                <div className="profile-dropdown">
                  <button 
                    className="profile-btn"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    {user.name.split(' ')[0]} <span className="caret">▼</span>
                  </button>
                  {isProfileOpen && (
                    <div className="dropdown-menu">
                      <button 
                        onClick={() => {navigate('/profile'); setIsProfileOpen(false);}}
                      >
                        <FiUser /> Profile
                      </button>
                      <div className="dropdown-divider" />
                      <button 
                        onClick={() => {handleLogout(); setIsProfileOpen(false);}}
                      >
                        <FiLogOut style={{ color: '#ef4444' }} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}