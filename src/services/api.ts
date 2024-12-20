const BASE_URL = 'https://dummyjson.com';

export const api = {
  async getProducts() {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=12`); // Ограничим количество продуктов
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.products.map((product: any) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        imageUrl: product.thumbnail,
        price: product.price,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        stock: product.stock,
        isLiked: false
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getRandomProduct() {
    try {
      // Получаем случайный ID от 1 до 100
      const randomId = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(`${BASE_URL}/products/${randomId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch random product');
      }
      const product = await response.json();
      return {
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        imageUrl: product.thumbnail,
        price: product.price,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        stock: product.stock,
        isLiked: false
      };
    } catch (error) {
      console.error('Error fetching random product:', error);
      throw error;
    }
  },

  async getProductById(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const product = await response.json();
      return {
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        imageUrl: product.thumbnail,
        price: product.price,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        stock: product.stock,
        isLiked: false
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};