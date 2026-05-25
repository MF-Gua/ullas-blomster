import { OccasionAPI } from '../api/OccasionAPI.js';
import { OccasionFilter } from '../api/OccasionFilter.js';
import productApi from "../api/productApi.js";
import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { Footer } from './Footer.js';
import { renderCustomBouquetPage } from './CustomBouquetPage.js';
import { Login, initLogin } from './Login.js';

let currentView = 'home';
let productsData = [];
let occasionsData = [];

async function initApp() {
    try {
        // Hent data fra API'er
        productsData = await productApi.getAllProducts();
        occasionsData = await OccasionAPI.getAllOccasions();

        // Første rendering
        render();
    } catch (error) {
        console.error("Fejl under initialisering af app:", error);
    }
}

function navigateTo(view) {
    currentView = view;
    render();
}

function render() {
    const app = document.getElementById('app');

    if (currentView === 'home') {
// Filtrering baseret på product type
        const bouquets = productsData.filter(p => p.productType === 'BOUQUET' || p.productType === 'CUSTOM_BOUQUET');
        app.innerHTML = `
        ${Navbar()}
        
        <!-- Hero 1: Viser den første buket -->
        ${Hero(bouquets[0], "Sæson/Højtidlighed Fremvisning", "Oplev vores unikke udvalg af sæsonens smukkeste buketter.")}
        
        <!-- Hero 2: Viser den anden buket (eller den første som backup) -->
        ${Hero(bouquets[1] || bouquets[0], "Byg din egen buket", "Sammensæt din helt egen personlige hilsen.", true)}
        
        <section class="catalog">
            <div class="container">
                <h2 class="section-title">Hele vores katalog</h2>
                <div class="product-grid">
                    ${productsData.map(p => ProductCard(p)).join('')}
                </div>
            </div>
        </section>
        <section class="container">
        </section>
        ${Footer()};
    }
        `;

        // Init funktioner til forsiden
        initLogin();
        const startButton = document.getElementById('start-build-bouquet-btn');
        if (startButton) {
            startButton.addEventListener('click', () => {
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


window.addEventListener('popstate', initApp);
document.addEventListener('DOMContentLoaded', initApp);


import { renderCartPage, addToCart, getCartCount } from './cartPage.js';

// Render the page
case 'cart':
renderCartPage(mainContent);
break;