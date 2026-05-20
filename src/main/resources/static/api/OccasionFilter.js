import { OccasionAPI } from './OccasionAPI.js';
import { ProductCard } from '../components/ProductCard.js';

export const OccasionFilter = {
    init() {
        // Tjekker dine kort i den nyligt dannede DOM
        const cards = [...document.querySelectorAll('.occasion-card')]
            .map(el => new OccasionCard(el));

        cards.forEach(card => {
            card.onClick(async selected => {
                cards.forEach(c => c.setActive(false));
                selected.setActive(true);

                // RETTET: Brug store API, så det matcher din import øverst!
                const products = await OccasionAPI.getProductsByOccasion(selected.occasion);
                OccasionFilter.renderProducts(products);
            });
        });
    },

    // RETTET: Den herreløse tekststreng, der svævede her, er slettet!
    renderProducts(products) {
        const container = document.getElementById('product-cards-container');
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `<p style="grid-column: span 3; color: #666;">Der er i øjeblikket ingen blomster registreret til denne anledning.</p>`;
            return;
        }

        // Vi mapper over produkterne og bruger din smukke ProductCard-komponent!
        container.innerHTML = products.map(product => ProductCard(product)).join('');
    }
};

// Hjælpeklasse
class OccasionCard {
    constructor(element) {
        this.element = element;
        this.occasion = element.dataset.occasion;
    }

    onClick(callback) {
        this.element.addEventListener('click', () => callback(this));
    }

    setActive(active) {
        if (active) {
            this.element.style.background = '#1b3022'; // Skiftet til solid farve hvis din CSS variabel driller
            this.element.style.color = 'white';
            this.element.style.borderColor = '#1b3022';
        } else {
            this.element.style.background = '#fff';
            this.element.style.color = '#333';
            this.element.style.borderColor = '#ddd';
        }
    }
}