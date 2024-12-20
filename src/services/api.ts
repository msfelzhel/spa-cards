const BASE_URL = 'https://dummyjson.com';

export const api = {
    async getProducts() {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        return data.products.map((product: any) => ({
            id: product.id.toString(),
            title: product.title,
            description: product.description,
            imageUrl: product.thumbnail,
            isLiked: false
        }));
    },

    async getRandomProduct() {
        const randomId = Math.floor(Math.random() * 100) + 1;
        const response = await fetch(`${BASE_URL}/products/${randomId}`);
        const product = await response.json();
        return {
            id: product.id.toString(),
            title: product.title,
            description: product.description,
            imageUrl: product.thumbnail,
            isLiked: false
        };
    }
};