import React from 'react';
import Card from '../Card/Card';

const Hand = ({ cards, onCardDrop }) => {
    return (
        <>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onDragEnd={onCardDrop}
                />
            ))}
        </>
    );
};

export default Hand;
