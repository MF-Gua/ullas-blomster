class CartAPI {
    async getCart(userId) {
        const response = await fetch(`/api/cart/${userId}`);
        return response.json();
    }

    async addItem(cartId, cartItem) {
        const response = await fetch(`/api/cart/${cartId}/items`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cartItem),
        });
        return response.json();
    }

    async removeItem(cartId, itemId) {
        const response = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
            method: 'DELETE',
        });
        return response.json();
    }

    async updateQuantity(cartId, itemId, quantity) {
        const response = await fetch(`/api/cart/${cartId}/items/${itemId}?quantity=${quantity}`, {
            method: 'PUT',
        });
        return response.json();
    }

    async clearCart(cartId) {
        const response = await fetch(`/api/cart/${cartId}/clear`, {
            method: 'DELETE',
        });
        return response.json();
    }
}

export default CartAPI;