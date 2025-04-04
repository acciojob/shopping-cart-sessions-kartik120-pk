// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
function getCart() {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach click events
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart on page
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add to cart and update session
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product); // Add product even if it's already in the cart
  saveCart(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial load
renderProducts();
renderCart();
clearCartBtn.addEventListener("click", clearCart);
