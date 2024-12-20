import React, { useState } from 'react';
import './styles.css';

interface AddCardFormProps {
    onAdd: (name: string, imageUrl: string, breed: string) => void;
    onFetchRandom: () => void;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({ onAdd, onFetchRandom }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [breed, setBreed] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && imageUrl && breed) {
            onAdd(name, imageUrl, breed);
            setName('');
            setImageUrl('');
            setBreed('');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-form">
                <input
                    type="text"
                    placeholder="Dog name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <button type="submit">Add Custom Dog</button>
            </form>
            <button onClick={onFetchRandom} className="fetch-button">
                Fetch Random Dog
            </button>
        </div>
    );
};