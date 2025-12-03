import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Cart.css";
import { getCart, removeFromCart, updateQuantity, getCartTotal } from "../utils/cart";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const changeQty = (id, qty) => {
    updateQuantity(id, qty);
    setCartItems(getCart());
  };

  const subtotal = getCartTotal();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added anything yet</p>
        <Link to="/" className="btn btn-large">
          🛍️ Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">{item.image ? <img src={item.image} alt={item.name} /> : <div className="placeholder">Image</div>}</div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${item.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => changeQty(item.id, Math.max(1, item.quantity - 1))}>−</button>
              <input type="number" value={item.quantity} readOnly />
              <button onClick={() => changeQty(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
            <button className="btn-remove" onClick={() => handleRemove(item.id)}>✕</button>
          </div>
        ))}

        <div className="cart-summary simple">
          <h2>Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

         
        </div>
      </div>
    </div>
  );
}
