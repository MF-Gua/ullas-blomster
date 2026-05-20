//Snakker med DB

const CustomBouquetAPI = {

    productBaseUrl: '/api/products',
    customBouquetBaseUrl: '/api/custom-bouquets',

//Henter blomster fra db
    async getAllFlowers() {
        try {
            const response = await fetch(this.productBaseUrl);

            if (!response.ok) {
                throw new Error('Kunne ikke hente blomster');
            }

            const products = await response.json();

            return products.filter(function(product) {
                return product.productType === 'FLOWER';
            });

        } catch (error) {
            console.error('Fejl i getAllFlowers:', error);
            return [];
        }
    },

//gemmer blomster til db
    async createCustomBouquet(bouquet) {
        try {
            const response = await fetch(this.customBouquetBaseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bouquet)
            });

            if (!response.ok) {
                throw new Error('Kunne ikke gemme buketten');
            }

            return await response.json();

        } catch (error) {
            console.error('Fejl i createCustomBouquet:', error);
            return null;
        }
    }
};

export default CustomBouquetAPI;