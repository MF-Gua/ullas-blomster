/**
 * Product API Component
 * Håndterer al kommunikation med backendens produkt-endpoints.
 */
const ProductAPI = {
    // Grund-URL til dit API
    baseUrl: '/services/products',

    /**
     * Henter alle produkter fra databasen.
     * @returns {Promise<Array>} Liste over alle produkter
     */
    async getAllProducts() {
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok) throw new Error('Kunne ikke hente produkter');
            return await response.json();
        } catch (error) {
            console.error('Fejl i getAllProducts:', error);
            return [];
        }
    },

    /**
     * Henter produkter baseret på en specifik type/kategori.
     * @param {string} type - Typen af produkt (f.eks. 'rose', 'tulip', 'bouquet')
     * @returns {Promise<Array>} Liste over filtrerede produkter
     */
    async getProductsByType(type) {
        try {
            // Vi antager dit backend endpoint er struktureret som /services/products/type/{type}
            const response = await fetch(`${this.baseUrl}/type/${type}`);
            if (!response.ok) throw new Error(`Kunne ikke hente produkter af typen: ${type}`);
            return await response.json();
        } catch (error) {
            console.error(`Fejl i getProductsByType for ${type}:`, error);
            return [];
        }
    }
};

// Eksportér komponenten så den kan bruges i andre scripts
export default ProductAPI;