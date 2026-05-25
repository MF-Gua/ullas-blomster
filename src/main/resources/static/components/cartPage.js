export function renderCartPage(container) {
    container.innerHTML = `
        <div class="container cart-page">
            <div class="cart-header">
                <h1>Din Kurv</h1>
                <a href="/" class="btn-secondary cart-continue-link">← Fortsæt med at handle</a>
            </div>

            <div class="cart-layout">
                <div class="cart-items-section">
                    <div class="cart-items-header">
                        <span>Produkt</span>
                        <span>Pris</span>
                        <span>Antal</span>
                        <span>Total</span>
                        <span></span>
                    </div>
                    <div id="cart-items-list">
                        <!-- Populated by JS -->
                    </div>
                    <div id="cart-empty-msg" class="cart-empty" style="display:none;">
                        <p>Din kurv er tom.</p>
                        <a href="/" class="btn-primary">Se vores produkter</a>
                    </div>
                </div>

                <div class="cart-summary">
                    <h2>Ordreoversigt</h2>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span id="cart-subtotal">0,00 kr.</span>
                    </div>
                    <div class="summary-row">
                        <span>Levering</span>
                        <span id="cart-shipping">Gratis</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row summary-total">
                        <span>Total</span>
                        <span id="cart-total">0,00 kr.</span>
                    </div>
                    <button class="btn-primary cart-checkout-btn" id="cart-checkout-btn">
                        Gå til betaling
                    </button>
                    <p class="cart-summary-note">Moms inkluderet · Sikker betaling</p>
                </div>
            </div>
        </div>
    `;

    renderCartItems();
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function formatPrice(amount) {
    return amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr.';
}

function renderCartItems() {
    const cart = getCart();
    const listEl = document.getElementById('cart-items-list');
    const emptyEl = document.getElementById('cart-empty-msg');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    if (!listEl) return;

    if (cart.length === 0) {
        listEl.innerHTML = '';
        emptyEl.style.display = 'block';
        checkoutBtn.disabled = true;
        updateSummary(0);
        return;
    }

    emptyEl.style.display = 'none';
    checkoutBtn.disabled = false;

    listEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-product">
                <div class="cart-item-image">
                    ${item.imageUrl
        ? `<img src="${item.imageUrl}" alt="${item.name}">`
        : `<div class="cart-item-image-placeholder"></div>`
    }
                </div>
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    ${item.occasion ? `<p class="cart-item-meta">${item.occasion}</p>` : ''}
                </div>
            </div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-qty">
                <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
            <button class="cart-remove-btn" data-index="${index}" aria-label="Fjern produkt">✕</button>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateSummary(subtotal);

    attachCartEvents();
}

function updateSummary(subtotal) {
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const shippingEl = document.getElementById('cart-shipping');

    const shippingThreshold = 499;
    const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 49;

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost);
    if (totalEl) totalEl.textContent = formatPrice(subtotal + shippingCost);
}

function attachCartEvents() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            const action = btn.dataset.action;
            const cart = getCart();

            if (action === 'increase') {
                cart[index].quantity += 1;
            } else if (action === 'decrease') {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
            }

            saveCart(cart);
            renderCartItems();
        });
    });

    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            renderCartItems();
        });
    });

    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Betalingsflow ikke implementeret endnu.');
        });
    }
}

/*
 * CART UTILITY — brug disse i dine andre komponenter:
 *
 * import { addToCart } from './cartPage.js';
 *
 * addToCart({ id: 1, name: 'Roser', price: 149, quantity: 1, occasion: 'Fødselsdag' });
 */
export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += product.quantity ?? 1;
    } else {
        cart.push({ ...product, quantity: product.quantity ?? 1 });
    }

    saveCart(cart);
}

export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}