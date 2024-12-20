import { create } from 'zustand';
import { Product } from '../types/types';

const DUMMY_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Product 1',
        description: 'Description for product 1. This is a test description that might be long enough to be truncated.',
        imageUrl: 'https://picsum.photos/300/200?random=1',
        isLiked: false,
    },
    {
        id: '2',
        title: 'Product 2',
        description: 'Description for product 2. Another test description that should be truncated in the card view.',
        imageUrl: 'https://picsum.photos/300/200?random=2',
        isLiked: false,
    },
    {
        id: '3',
        title: 'Product 3',
        description: 'Description for product 3. Yet another test description that should be truncated in the card view.',
        imageUrl: 'https://picsum.photos/300/200?random=3',
        isLiked: false,
    }
];

interface StoreState {
    products: Product[];
    filter: 'all' | 'liked';
    toggleLike: (id: string) => void;
    removeProduct: (id: string) => void;
    setFilter: (filter: 'all' | 'liked') => void;
    getFilteredProducts: () => Product[];
}

export const useStore = create<StoreState>((set, get) => ({
    products: DUMMY_PRODUCTS,
    filter: 'all',

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