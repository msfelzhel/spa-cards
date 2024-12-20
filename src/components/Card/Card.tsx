import React from 'react';
import { DogCard } from '../../types/types';
import './styles.css';

interface CardProps {
    card: DogCard;
    onRemove: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onRemove }) => {
    return (
        <div className="card">
            <img src={card.imageUrl} alt={card.name} className="card-image" />
            <div className="card-content">
                <h3>{card.name}</h3>
                <p>Breed: {card.breed}</p>
                <p>{card.isCustom ? 'Custom' : 'API'} Card</p>
                <button onClick={() => onRemove(card.id)} className="remove-button">
                    Remove
                </button>
            </div>
        </div>
    );
};