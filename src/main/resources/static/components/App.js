import { OccasionAPI } from '../api/OccasionAPI.js';
import { OccasionFilter } from '../api/OccasionFilter.js';
import ProductAPI from '../api/productApi.js';
import CartAPI from '../api/cartAPI.js';
import CheckoutButton from '../components/CheckoutButton.js';
import Cart from '../model/Cart.js';
import CartItem from '../model/CartItem.js';

import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { Footer } from './Footer.js';
import { renderCustomBouquetPage } from './CustomBouquetPage.js';

let currentView = 'home';
let productsData = [];
let occasionsData = [];

const cartAPI = new CartAPI();

async function initApp() {
    try {
        productsData = await ProductAPI.getAllProducts();
        occasionsData = await OccasionAPI.getAllOccasions();
        render();
    } catch (error) {
        console.error("Fejl under initialisering af app:", error);
    }
}

function navigateTo(view) {
    currentView = view;
    render();
}

async function renderCartPage(userId) {
    const app = document.getElementById('app');
    const cartData = await cartAPI.getCart(userId);
    const cart = new Cart(cartData.id, cartData.user);
    cart.cartItems = cartData.cartItems.map(
        (item) => new CartItem(item.id, item.productId, item.quantity, item.price)
    );
    cart.totalPrice = cartData.totalPrice;

    app.innerHTML = `
        ${Navbar()}
        <div class="container" style="padding: 40px 20px;">
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
        </div>
        ${Footer()}
    `;

    CheckoutButton.render("checkout-btn-container", cart.id);
    setupNavbarListeners();
}

async function removeItem(cartId, itemId) {
    await cartAPI.removeItem(cartId, itemId);
    renderCartPage(1);
}

async function updateQuantity(cartId, itemId, quantity) {
    await cartAPI.updateQuantity(cartId, itemId, parseInt(quantity));
    renderCartPage(1);
}

function render() {
    const app = document.getElementById('app');

    if (window.location.hash === '#cart') {
        renderCartPage(1);
        return;
    }

    if (currentView === 'home') {
        app.innerHTML = `
            ${Navbar()}
            ${Hero(productsData[0], "Sæson/Højtidlighed Fremvisning", "Oplev vores unikke udvalg af sæsonens smukkeste blomster.")}
            ${Hero(productsData[1] || productsData[0], "Byg din egen buket", "Sammensæt din helt eigen personlige hilsen.", true)}
            <section class="catalog">
                <div class="container">
                    <h2 class="section-title">Katalog Fremvisning</h2>
                    <div class="product-grid">
                        ${productsData.map(p => ProductCard(p)).join('')}
                    </div>
                </div>
            </section>
            ${Footer()}
        `;

        const startButton = document.getElementById('start-build-bouquet-btn');
        if (startButton) {
            startButton.addEventListener('click', function () {
                window.history.pushState({}, '', '/custom-bouquet');
                renderCustomBouquetPage();
            });
        }

    } else if (currentView === 'catalog') {
        app.innerHTML = `
            ${Navbar()}
            <div class="container" style="display: grid; grid-template-columns: 250px 1fr; gap: 40px; padding: 40px 20px;">
                <aside>
                    <h3>Anledninger</h3>
                    <div id="occasion-cards-container" class="filter-sidebar"></div>
                </aside>
                <main>
                    <h2 class="section-title">Anlednings Katalog</h2>
                    <div class="product-grid" id="product-cards-container">
                        <p style="color: #666;">Vælg en anledning i menuen til venstre for at se udvalget...</p>
                    </div>
                </main>
            </div>
            ${Footer()}
        `;

        const container = document.getElementById('occasion-cards-container');
        if (container) {
            occasionsData.forEach(occasion => {
                const el = document.createElement('div');
                el.classList.add('occasion-card');
                el.style.cssText = "padding: 15px; margin-bottom: 10px; background: #fff; border: 1px solid #ddd; cursor: pointer; border-radius: 4px;";
                el.dataset.occasion = occasion;
                el.textContent = occasion;
                container.appendChild(el);
            });
        }

        OccasionFilter.init();
    }

    setupNavbarListeners();
}

function setupNavbarListeners() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.textContent.trim();
            if (text === 'Katalog') {
                e.preventDefault();
                navigateTo('catalog');
            } else if (text === 'Hjem') {
                e.preventDefault();
                navigateTo('home');
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }
}

window.removeItem = removeItem;
window.updateQuantity = updateQuantity;

window.addEventListener('popstate', initApp);
document.addEventListener('DOMContentLoaded', initApp);