import { useState } from "react";
import {
  CARD_IMAGES,
  INITIAL_POSITIONS,
  DECK_POSITION,
} from "../constants/gameData";

export const useGame = () => {
  const [cards, setCards] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleCardDrop = (id, position, playZoneRef, burnZoneRef) => {
    setIsDragging(false);

    const point = {
      x: position.x,
      y: position.y,
    };

    const isInside = (ref) => {
      if (!ref?.current) return false;
      const rect = ref.current.getBoundingClientRect();

      return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
      );
    };

    if (isInside(playZoneRef)) {
      console.log("Carta jugada:", id);
    } else if (isInside(burnZoneRef)) {
      console.log("Carta quemada:", id);
    } else {
      console.log("Carta soltada fuera de zonas");
    }

    // Por ahora vuelve a la mano
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
    isDragging,
    setIsDragging,
  };
};

export default useGame;
