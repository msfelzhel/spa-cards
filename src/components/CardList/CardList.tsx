import React from 'react';
import { Card } from '../Card/Card';
import { DogCard } from '../../types/types';


interface CardListProps {
    cards: DogCard[];
    onRemove: (id: string) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onRemove }) => {
    return (
        <div className="card-list">
            {cards.map((card) => (
                <Card key={card.id} card={card} onRemove={onRemove} />
            ))}
        </div>
    );
};