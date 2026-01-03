import { useState } from "react";
import {
  CARD_IMAGES,
  INITIAL_POSITIONS,
  DECK_POSITION,
} from "../constants/gameData";

export const useGame = () => {
  const [handCards, setHandCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const dealCards = () => {
    if (handCards.length > 0) {
      // Optional: clear hand before re-dealing
      setHandCards([]);
      // Clear table when re-dealing
      setTableCards([]);
      // Small delay to allow clear animation if needed
      setTimeout(() => createNewHand(), 100);
      return;
    }
    // also clear any table cards when dealing first time
    setTableCards([]);
    createNewHand();
  };

  const createNewHand = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.67;

    const newHand = INITIAL_POSITIONS.map((pos) => ({
      id: crypto.randomUUID(),
      src: CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)],
      position: { x: DECK_POSITION.x, y: DECK_POSITION.y },
      zone: "hand",
      home: { x: centerX + pos.x, y: centerY + pos.y },
      rotate: pos.rotate,
    }));

    setHandCards(newHand);

    // Animation: Move to home position
    setTimeout(() => {
      setHandCards((prev) =>
        prev.map((card) => ({
          ...card,
          position: card.home,
        }))
      );
    }, 50);
  };

  // Helper: compute positions for table cards (centered row)
  const computeTableLayout = (cardsArray, opts = {}) => {
    const spacing = opts.spacing || 140; // px between cards
    const centerX = window.innerWidth / 2;
    // vertical position for table cards (tweakable)
    const centerY = window.innerHeight * (opts.centerYFactor || 0.55);

    const total = cardsArray.length;
    const startX = centerX - ((Math.max(total, 1) - 1) * spacing) / 2;

    return cardsArray.map((card, i) => ({
      ...card,
      position: { x: startX + i * spacing, y: centerY },
      rotate: card.rotate ?? 0,
    }));
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

    // 👉 CARTA JUGADA
    if (isInside(playZoneRef)) {
      // Remove from hand
      setHandCards((prev) => prev.filter((c) => c.id !== id));

      // Add to table and reflow all table cards into a centered row
      setTableCards((prev) => {
        const playedCard = { ...handCards.find((c) => c.id === id) };
        playedCard.zone = "table";
        playedCard.rotate = 0;

        const newTable = [...prev, playedCard];
        // If there are more than 3 cards after playing, remove the last 3 (most recent)
        let visibleTable = newTable;
        if (newTable.length > 3) {
          visibleTable = newTable.slice(0, newTable.length - 3);
        }

        return computeTableLayout(visibleTable);
      });

      return;
    }

    // 👉 CARTA QUEMADA
    if (isInside(burnZoneRef)) {
      // Remove from hand
      setHandCards((prev) => prev.filter((c) => c.id !== id));

      // Add to table as a burned card (with burning animation) and place next to last played
      setTableCards((prev) => {
        const burnedCard = { ...handCards.find((c) => c.id === id) };
        burnedCard.zone = "burned";
        burnedCard.burning = true; // trigger CSS animation
        burnedCard.rotate = 0;

        const newTable = [...prev, burnedCard];

        let visibleTable = newTable;
        if (newTable.length > 3) {
          visibleTable = newTable.slice(0, newTable.length - 3);
        }

        // Use same layout helper (centerY default is 0.55)
        return computeTableLayout(visibleTable);
      });

      // Nota: mantenemos `burning: true` para que la carta quede con el
      // aspecto quemado de forma persistente. Si en el futuro queremos
      // limpiar la marca, podemos hacerlo aquí con un timeout.
      return;
    }

    // 👉 SI NO CAE EN NINGUNA ZONA → vuelve a la mano
    setHandCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, position: card.home } : card
      )
    );
  };

  /**
   * simulateOpponentPlay(cards)
   * - cards: array of objects { id?, src, rotate?, zone? }
   *   - id: optional string. If missing, an id will be generated.
   *   - src: image path (required)
   *   - rotate: optional rotation angle in degrees
   *   - zone: optional, either 'table' (default) or 'burned'
   *
   * This function adds the given cards to `tableCards` and recalculates the
   * layout (centers them in a row). Useful to simulate opponent plays from
   * the backend. Call it like:
   *
   *   simulateOpponentPlay([
   *     { src: '/images/1Basto.jpg' },
   *     { src: '/images/4Copa.jpg', rotate: 6 },
   *   ]);
   *
   * Notes:
   * - Provide full `src` public paths (e.g. `/images/Blanca.jpg`).
   * - If you want to mark a card as burned, pass `zone: 'burned'`.
   */
  const simulateOpponentPlay = (cards = []) => {
    if (!Array.isArray(cards) || cards.length === 0) return;

    setTableCards((prev) => {
      const prepared = cards.map((c) => ({
        id: c.id || crypto.randomUUID(),
        src: c.src,
        zone: c.zone === "burned" ? "burned" : "table",
        burning: c.zone === "burned" ? true : false,
        rotate: c.rotate || 0,
      }));

      const newTable = [...prev, ...prepared];

      let visibleTable = newTable;
      if (newTable.length > 3) {
        visibleTable = newTable.slice(0, newTable.length - 3);
      }

      return computeTableLayout(visibleTable);
    });
  };

  return {
    handCards,
    tableCards,
    dealCards,
    handleCardDrop,
    simulateOpponentPlay,
    isDragging,
    setIsDragging,
  };
};

export default useGame;
