import CartAPI from "../api/cartAPI.js";
import CheckoutButton from "../components/CheckoutButton.js";
import Cart from "../model/Cart.js";
import CartItem from "../model/CartItem.js";

const cartAPI = new CartAPI();

async function renderCartPage(userId) {
    const cartData = await cartAPI.getCart(userId);
    const cart = new Cart(cartData.id, cartData.user);
    cart.cartItems = cartData.cartItems.map(
        (item) => new CartItem(item.id, item.productId, item.quantity, item.price)
    );
    cart.totalPrice = cartData.totalPrice;

    const container = document.getElementById("cart-container");
    container.innerHTML = `
    <h1>Your Cart</h1>
    <div id="cart-items">
      ${cart.cartItems.map((item) => `
        <div class="cart-item" id="item-${item.id}">
          <span>Product ID: ${item.productId}</span>
          <input type="number" value="${item.quantity}" min="1"
            onchange="updateQuantity(${cart.id}, ${item.id}, this.value)" />
          <span>Price: ${item.price} kr</span>
          <span>Subtotal: ${item.getSubtotal()} kr</span>
          <button onclick="removeItem(${cart.id}, ${item.id})">Remove</button>
        </div>
      `).join("")}
    </div>
    <div id="cart-total">
      <strong>Total: ${cart.totalPrice} kr</strong>
    </div>
    <div id="checkout-btn-container"></div>
  `;

    CheckoutButton.render("checkout-btn-container", cart.id);
}

async function removeItem(cartId, itemId) {
    await cartAPI.removeItem(cartId, itemId);
    const userId = 1; //Hardcodes lige nu, skal vel ændres? Jeg er dum
    renderCartPage(userId);
}

async function updateQuantity(cartId, itemId, quantity) {
    await cartAPI.updateQuantity(cartId, itemId, parseInt(quantity));
    const userId = 1; //Same hardcode, er dum og træt
    renderCartPage(userId);
}

export { renderCartPage };