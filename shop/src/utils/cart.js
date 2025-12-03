// Simple cart and likes utilities using localStorage
export function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  try {
    // notify listeners in this tab
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('localStorageUpdated'));
  } catch (e) {}
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.id !== productId);
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = qty;
    if (item.quantity <= 0) {
      return removeFromCart(productId);
    }
  }
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((s, i) => s + i.price * i.quantity, 0);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((s, i) => s + i.quantity, 0);
}

// Likes utilities
export function getLikes() {
  try {
    return JSON.parse(localStorage.getItem("likes") || "[]");
  } catch (e) {
    return [];
  }
}

export function toggleLike(id) {
  const likes = getLikes();
  const idx = likes.indexOf(id);
  if (idx >= 0) likes.splice(idx, 1);
  else likes.push(id);
  localStorage.setItem("likes", JSON.stringify(likes));
  try {
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('localStorageUpdated'));
  } catch (e) {}
  return likes;
}

export function isLiked(id) {
  return getLikes().includes(id);
}
