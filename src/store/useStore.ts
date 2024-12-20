import { create } from 'zustand';
import { Product } from '../types/types';
import { api } from '../services/api';

interface StoreState {
    products: Product[];
    filter: 'all' | 'liked';
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    addRandomProduct: () => Promise<void>;
    toggleLike: (id: string) => void;
    removeProduct: (id: string) => void;
    setFilter: (filter: 'all' | 'liked') => void;
    getFilteredProducts: () => Product[];
}

export const useStore = create<StoreState>((set, get) => ({
    products: [],
    filter: 'all',
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        try {
            set({ isLoading: true, error: null });
            const products = await api.getProducts();
            set({ products, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch products', isLoading: false });
        }
    },

    addRandomProduct: async () => {
        try {
            set({ isLoading: true, error: null });
            const newProduct = await api.getRandomProduct();
            set((state) => ({
                products: [...state.products, newProduct],
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to add random product', isLoading: false });
        }
    },

    toggleLike: (id) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? { ...product, isLiked: !product.isLiked } : product
            ),
        })),

    removeProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        })),

    setFilter: (filter) => set({ filter }),

    getFilteredProducts: () => {
        const { products, filter } = get();
        return filter === 'all' ? products : products.filter((product) => product.isLiked);
    },
}));