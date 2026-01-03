import React, { useEffect } from "react";
import { useGame } from "../../hooks/useGame";

/**
 * OpponentSimulator
 * -----------------
 * A small helper component to programmatically simulate opponent plays.
 *
 * Props:
 * - plays: optional array of card objects to play when `plays` changes.
 *   Each card: { id?, src, rotate?, zone? }
 *
 * Usage examples:
 * 1) Declarative: render <OpponentSimulator plays={[{src: '/images/Blanca.jpg'}]} />
 *    - whenever the `plays` prop changes the provided cards will be added to the table.
 *
 * 2) Imperative (recommended for dev/testing): call the hook's function
 *    from any component that uses `useGame()`:
 *
 *    const { simulateOpponentPlay } = useGame();
 *    simulateOpponentPlay([{ src: '/images/Blanca.jpg' }]);
 *
 * Requirements:
 * - Images must be publicly available under `public/` (e.g. `/images/Blanca.jpg`).
 * - If you want a burned card, pass `zone: 'burned'` in the card object.
 *
 * Notes:
 * - This component is intended for development/testing or local simulation.
 * - For real multiplayer, emit the opponent play from your server and call
 *   `simulateOpponentPlay` on each client when receiving the event.
 */
const OpponentSimulator = ({ plays = [] }) => {
  const { simulateOpponentPlay } = useGame();

  useEffect(() => {
    if (Array.isArray(plays) && plays.length > 0) {
      simulateOpponentPlay(plays);
    }
  }, [plays]);

  // This component renders nothing by default; it's a controller only.
  return null;
};

export default OpponentSimulator;
