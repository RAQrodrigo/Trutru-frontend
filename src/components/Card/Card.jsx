import React, { useState } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import './Card.css';

const Card = ({ card, onDragEnd }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { position, isDragging, handleMouseDown } = useDraggable({
        id: card.id,
        initialPosition: card.position,
        onDragEnd: () => onDragEnd(card.id)
    });

    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging
            ? `translate(-50%, -50%) rotate(0deg) scale(1.1)`
            : isHovered
            ? `translate(-50%, -60%) rotate(${card.rotate}deg) scale(1.05)`
            : `translate(-50%, -50%) rotate(${card.rotate}deg) scale(1)`,
        zIndex: isDragging || isHovered ? 100 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "all 0.25s ease",
    };

    return (
        <img
            src={card.src}
            className="card-image"
            draggable={false}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={style}
            alt="Card"
        />
    );
};

export default Card;
