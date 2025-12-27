import { useState } from "react";
import {
  CARD_IMAGES,
  INITIAL_POSITIONS,
  DECK_POSITION,
} from "../constants/gameData";

export const useGame = () => {
  const [cards, setCards] = useState([]);

  const dealCards = () => {
    if (cards.length > 0) {
      // Optional: clear cards before re-dealing or just return
      setCards([]);
      // Small delay to allow clear animation if needed
      setTimeout(() => createNewHand(), 100);
      return;
    }
    createNewHand();
  };

  const createNewHand = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.67;

    const newHand = INITIAL_POSITIONS.map((pos) => ({
      id: crypto.randomUUID(),
      src: CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)],
      position: { x: DECK_POSITION.x, y: DECK_POSITION.y }, // Start at deck
      home: { x: centerX + pos.x, y: centerY + pos.y }, // Destination
      rotate: pos.rotate,
    }));

    setCards(newHand);

    // Animation: Move to home position
    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          position: card.home,
        }))
      );
    }, 50);
  };

  const handleCardDrop = (id) => {
    // Snap back to home position on drop
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, position: card.home } : card
      )
    );
  };

  return {
    cards,
    dealCards,
    handleCardDrop,
  };
};
