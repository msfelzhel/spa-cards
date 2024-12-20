import React from 'react';
import { AddCardForm } from './components/AddCardForm/AddCardForm.tsx';
import { CardList } from './components/CardList/CardList.tsx';
import { useStore } from './store/useStore.ts';
import './App.css';

const App: React.FC = () => {
    const { cards, addCard, removeCard, fetchRandomDog } = useStore();

    const handleAddCustomCard = (name: string, imageUrl: string, breed: string) => {
        addCard({
            id: Date.now().toString(),
            name,
            imageUrl,
            breed,
            isCustom: true,
        });
    };

    return (
        <div className="app">
            <h1>Dog Cards Collection</h1>
            <AddCardForm onAdd={handleAddCustomCard} onFetchRandom={fetchRandomDog} />
            <CardList cards={cards} onRemove={removeCard} />
        </div>
    );
};

export default App;