// Vi tilføjer 'export' foran, så editoren holder op med at gøre den grå!
export const OccasionAPI = {

    async getAllOccasions() {
<<<<<<< HEAD:src/main/resources/static/services/OccasionAPI.js
        const response = await fetch('/services/occasions');
=======
        const response = await fetch('/api/occasions');
        if (!response.ok) throw new Error("Kunne ikke hente anledninger");
>>>>>>> main:src/main/resources/static/api/OccasionAPI.js
        return response.json();
    },

<<<<<<< HEAD:src/main/resources/static/services/OccasionAPI.js
    async getProductsByOccasiion(occasion) {
        const response = await fetch('/services/products?occasion=${occasion}');
=======
// KORREKT (med backticks - dem der vender skråt):
    async getProductsByOccasion(occasion) {
        const response = await fetch(`/api/products?occasion=${occasion}`);
        if (!response.ok) throw new Error("Kunne ikke hente produkter for denne anledning");
>>>>>>> main:src/main/resources/static/api/OccasionAPI.js
        return response.json();
    }
<<<<<<< HEAD:src/main/resources/static/services/OccasionAPI.js
}
document.addEventListener('DOMContentLoaded', () => {
    // Fetch products from your ProductController
    fetch('/services/products')
        .then(response => response.json())
        .then(products => {
            const grid = document.getElementById('product-list');
            if(products.length > 0) {
                grid.innerHTML = ''; // Clear placeholders
                products.forEach(prod => {
                    grid.innerHTML += `
                        <div class="product-card" style="padding:15px; background:#f9f9f9; text-align:center;">
                            <div style="background:#ddd; height:150px; margin-bottom:10px;"></div>
                            <h4>${prod.name}</h4>
                            <p>${prod.price} DKK</p>
                        </div>
                    `;
                });
            }
        });
});
=======
};
>>>>>>> main:src/main/resources/static/api/OccasionAPI.js
