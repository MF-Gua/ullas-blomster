import CustomBouquetAPI from '../api/CustomBouquetApi.js';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';

//metode som skaber hele byg selv siden
export async function renderCustomBouquetPage() {
    const app = document.getElementById('app');

    try {

        //Henter alle blomster fra API
        const flowers = await CustomBouquetAPI.getAllFlowers();

        app.innerHTML = `
            ${Navbar()}

            <main class="container bouquet-page">
                <h1>Byg din egen buket</h1>
                <p>Vælg blomster og sammensæt din egen buket.</p>

                <section class="bouquet-builder-layout">
                    <div>
                        <h2>Vælg blomster</h2>

                        <section class="product-grid">
                            ${
            //Tjekeker alle blomster
            flowers.map(function(flower) {
                return `
                                        <div class="product-card">
                                            <img 
                                                src="${flower.imageUrl}" 
                                                alt="${flower.name}"
                                                style="width:100%; height:180px; object-fit:contain;"
                                            >

                                            <h3>${flower.name}</h3>
                                            <p>${flower.description ?? ""}</p>
                                            <p>${flower.price} kr.</p>

                                            <button class="add-flower-btn"
                                                    data-id="${flower.id}"
                                                    data-name="${flower.name}"
                                                    data-price="${flower.price}">
                                                Tilføj til buket
                                            </button>
                                        </div>
                                    `;
            }).join('')
        }
                        </section>
                    </div>

                    <section class="bouquet-summary">
                        <h2>Din buket</h2>

                        <div id="selected-flowers"></div>

                        <p class="total-price-row">
                            <strong>Total pris:</strong>
                            <span id="total-price">0</span> kr.
                        </p>

                        <div class="bouquet-actions">
                            <button id="save-bouquet-btn">Gem buket</button>
                        
                            <button id="add-to-cart-btn">
                                Tilføj til indkøbskurv
                            </button>
                        </div>
                    </section>
                </section>
            </main>

            ${Footer()}
        `;

        setupBouquetEvents();

    } catch (error) {
        console.error("Fejl på CustomBouquetPage:", error);
    }
}

//Denne funktion håndtere alle knapper
function setupBouquetEvents() {
    const selectedFlowers = [];
    const selectedFlowersList = document.getElementById('selected-flowers');
    const totalPriceElement = document.getElementById('total-price');
    const addButtons = document.querySelectorAll('.add-flower-btn');
    const saveButton = document.getElementById('save-bouquet-btn');
    const addToCartButton = document.getElementById('add-to-cart-btn');

    addButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const flower = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: Number(button.dataset.price)
            };

            selectedFlowers.push(flower);
            updateBouquetView(selectedFlowers, selectedFlowersList, totalPriceElement);
        });
    });

    saveButton.addEventListener('click', async function() {
        const groupedFlowers = groupFlowersById(selectedFlowers);

        const flowersText = groupedFlowers.map(function(flower) {
            return `${flower.quantity}x ${flower.name}`;
        }).join(', ');

        const bouquet = {
            flowersText: flowersText,
            totalPrice: calculateTotalPrice(selectedFlowers)
        };

        const result = await CustomBouquetAPI.createCustomBouquet(bouquet);

        if (result !== null) {
            alert('Buketten blev gemt!');
        } else {
            alert('Noget gik galt. Buketten blev ikke gemt.');
        }
    });

    addToCartButton.addEventListener('click', function() {

       //Mangler kode til indkøbskurv som ikke er oprettet

    });

}

//Funktion som opdaterer højre side med valgt buket
function updateBouquetView(selectedFlowers, selectedFlowersList, totalPriceElement) {
    const groupedFlowers = groupFlowersById(selectedFlowers);

    selectedFlowersList.innerHTML = groupedFlowers.map(function(flower) {
        return `
            <div class="selected-flower-row">
                <span>${flower.name}</span>
                <span>${flower.quantity} stk.</span>
                <span>${flower.price} kr./stk.</span>
                <span>${flower.price * flower.quantity} kr.</span>
                <button class="remove-flower-btn" data-id="${flower.id}">
                    Fjern
                </button>
            </div>
        `;
    }).join('');

    totalPriceElement.textContent = calculateTotalPrice(selectedFlowers);

    const removeButtons = document.querySelectorAll('.remove-flower-btn');

    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const id = button.dataset.id;

            const index = selectedFlowers.findIndex(function(flower) {
                return flower.id === id;
            });

            if (index !== -1) {
                selectedFlowers.splice(index, 1);
            }

            updateBouquetView(selectedFlowers, selectedFlowersList, totalPriceElement);
        });
    });
}

//Funktion som samler ens blomster sammen
function groupFlowersById(selectedFlowers) {
    const groupedFlowers = [];

    selectedFlowers.forEach(function(flower) {
        const existingFlower = groupedFlowers.find(function(groupedFlower) {
            return groupedFlower.id === flower.id;
        });

        if (existingFlower) {
            existingFlower.quantity = existingFlower.quantity + 1;
        } else {
            groupedFlowers.push({
                id: flower.id,
                name: flower.name,
                price: flower.price,
                quantity: 1
            });
        }
    });

    return groupedFlowers;
}

//Funktion som udregner totalpris
function calculateTotalPrice(selectedFlowers) {
    let total = 0;

    selectedFlowers.forEach(function(flower) {
        total = total + flower.price;
    });

    return total;
}