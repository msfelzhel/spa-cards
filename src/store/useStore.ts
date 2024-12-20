import create from 'zustand';
import { DogCard } from '../types/types';

interface StoreState {
    cards: DogCard[];
    addCard: (card: DogCard) => void;
    removeCard: (id: string) => void;
    fetchRandomDog: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
    cards: [],

    addCard: (card) =>
        set((state) => ({
            cards: [...state.cards, card]
        })),

    removeCard: (id) =>
        set((state) => ({
            cards: state.cards.filter(card => card.id !== id)
        })),

    fetchRandomDog: async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            const newCard: DogCard = {
                id: Date.now().toString(),
                imageUrl: data.message,
                breed: data.message.split('/')[4],
                name: `Dog ${Date.now()}`,
                isCustom: false
            };

            set((state) => ({
                cards: [...state.cards, newCard]
            }));
        } catch (error) {
            console.error('Error fetching dog:', error);
        }
    }
}));