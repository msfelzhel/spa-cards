// src/store/useStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/types';
import { api } from '../services/api';

interface StoreState {
  products: Product[];
  deletedProductIds: string[];
  filter: 'all' | 'liked';
  isLoading: boolean;
  error: string | null;
  currentProduct: Product | null;
  fetchProducts: () => Promise<void>;
  addRandomProduct: () => Promise<void>;
  toggleLike: (id: string) => void;
  removeProduct: (id: string) => void;
  setFilter: (filter: 'all' | 'liked') => void;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (product: Product) => void;
   // Добавляем новый метод в интерфейс
}


export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      deletedProductIds: [],
      filter: 'all',
      isLoading: false,
      error: null,
      currentProduct: null,

      fetchProducts: async () => {
        try {
          set({ isLoading: true, error: null });
          const products = await api.getProducts();
          const { deletedProductIds, products: currentProducts } = get();
          
          const filteredProducts = products.filter(
            (product: Product) => !deletedProductIds.includes(product.id)
          );

          const updatedProducts = filteredProducts.map((newProduct: Product) => {
            const existingProduct = currentProducts.find(p => p.id === newProduct.id);
            return existingProduct ? { ...newProduct, isLiked: existingProduct.isLiked } : newProduct;
          });
          
          const randomProducts = currentProducts.filter(
            product => !filteredProducts.find((p: Product) => p.id === product.id) && 
                      !deletedProductIds.includes(product.id)
          );
          
          set({ products: [...updatedProducts, ...randomProducts], isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch products', isLoading: false });
        }
      },

      addRandomProduct: async () => {
        try {
          set({ isLoading: true, error: null });
          const newProduct = await api.getRandomProduct();
          const { products, deletedProductIds } = get();
          
          if (!deletedProductIds.includes(newProduct.id) && 
              !products.find(p => p.id === newProduct.id)) {
            set((state) => ({
              products: [...state.products, newProduct],
              isLoading: false
            }));
          } else {
            get().addRandomProduct();
          }
        } catch (error) {
          set({ error: 'Failed to add random product', isLoading: false });
        }
      },

      toggleLike: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, isLiked: !product.isLiked } : product
          ),
          currentProduct: state.currentProduct?.id === id
            ? { ...state.currentProduct, isLiked: !state.currentProduct.isLiked }
            : state.currentProduct
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          deletedProductIds: [...state.deletedProductIds, id],
          currentProduct: state.currentProduct?.id === id ? null : state.currentProduct
        })),

      setFilter: (filter) => set({ filter }),

      fetchProductById: async (id) => {
        try {
          const { deletedProductIds } = get();
          
          if (deletedProductIds.includes(id)) {
            set({ error: 'Product was deleted', isLoading: false });
            return;
          }

          set({ isLoading: true, error: null });
          const existingProduct = get().products.find(p => p.id === id);
          if (existingProduct) {
            set({ currentProduct: existingProduct, isLoading: false });
            return;
          }

          const product = await api.getProductById(id);
          set({ currentProduct: product, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch product details', isLoading: false });
        }
      },

      // Добавляем новый метод createProduct
      createProduct: (product) => 
        set((state) => ({
          products: [...state.products, product]
        })),
    }),
    {
      name: 'products-storage',
      partialize: (state) => ({ 
        products: state.products,
        deletedProductIds: state.deletedProductIds,
        filter: state.filter
      }),
    }
  )
);