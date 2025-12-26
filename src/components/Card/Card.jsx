import React from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import './Card.css';

const Card = ({ card, onDragEnd }) => {
    const { position, isDragging, handleMouseDown } = useDraggable({
        id: card.id,
        initialPosition: card.position,
        onDragEnd: () => onDragEnd(card.id) // Notify parent to handle "drop" logic if needed
    });

    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging
            ? `translate(-50%, -50%) rotate(0deg) scale(1.1)`
            : `translate(-50%, -50%) rotate(${card.rotate}deg) scale(1)`,
        zIndex: isDragging ? 100 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    };

    return (
        <img
            src={card.src}
            className="card-image"
            draggable={false}
            onMouseDown={handleMouseDown}
            style={style}
            alt="Card"
        />
    );
};

export default Card;
