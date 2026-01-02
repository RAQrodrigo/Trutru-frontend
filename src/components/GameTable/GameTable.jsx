import React, { useRef } from "react";
import { useGame } from "../../hooks/useGame";
import Hand from "../Hand/Hand";
import Button from "../UI/Button";
import "./GameTable.css";
import PlayZone from "../PlayZone/PlayZone";
import BurnZone from "../BurnZone/BurnZone";

const GameTable = () => {
  const playZoneRef = useRef(null);
  const burnZoneRef = useRef(null);

  const { cards, dealCards, handleCardDrop, isDragging, setIsDragging } =
    useGame();

  return (
    <div className="game-table">
      <PlayZone ref={playZoneRef} visible={isDragging} />
      <BurnZone ref={burnZoneRef} visible={isDragging} />

      <div className="top-interface">
        <h1>Truquiño</h1>
        <Button onClick={dealCards} className="btn-repartir">
          Repartir Cartas
        </Button>
      </div>

      <Hand
        cards={cards}
        onCardDrop={handleCardDrop}
        onDragStart={() => setIsDragging(true)}
        playZoneRef={playZoneRef}
        burnZoneRef={burnZoneRef}
      />

      <div className="bottom-interface">
        <Button className="btn-envido">Envido</Button>
        <Button className="btn-truco">Truco</Button>
        <Button className="btn-mazo">Mazo</Button>
      </div>
    </div>
  );
};

export default GameTable;
